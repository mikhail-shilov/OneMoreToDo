import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import { nanoid } from 'nanoid'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile, readdir } = require('fs').promises

require('colors')

let Root
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []

const fsStore = `${__dirname}/records`

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

// List of task in category
server.get(['/api/v1/tasks/:category', '/api/v1/tasks/:category/:timespan'], (req, res) => {
  const { category, timespan } = req.params
  const safeTimespans = ['day', 'week', 'month']

  readFile(`${fsStore}/${category}.json`, { encoding: 'utf8' })
    .then((text) => {
      // Parse JSON from file
      let tasks = JSON.parse(text)
      // Drop DELETED tasks
      tasks = tasks.filter((task) => {
        const privateKey = '_isDeleted' // Unexpected dangling '_' in '_isDeleted' by linter
        return !task[privateKey]
      })
      // If timestamp is active - filter tasks by date
      if (safeTimespans.includes(timespan)) {
        let periodOfTime = 0
        // May change this switch to object { day: 1000 * 60 * 60 * 2 }
        switch (timespan) {
          case 'day':
            periodOfTime = 1000 * 60 * 60 * 24
            break
          case 'week':
            periodOfTime = 7 * 1000 * 60 * 60 * 2
            break
          case 'month':
            periodOfTime = 30 * 1000 * 60 * 60 * 24
            break
          default:
            console.log('Unknown timestamp!')
            break
        }

        tasks = tasks.filter((task) => {
          const privateKey = '_createdAt' // Unexpected dangling '_' in '_isDeleted' by linter
          return task[privateKey] + periodOfTime > +new Date()
        })
      }

      // Clear keys like _keyName
      tasks = tasks.map((task) => {
        const pubKeys = Object.keys(task).filter((item) => item.match(/^[^_].*/gm))
        return pubKeys.reduce((nonPrivateKey, key) => ({ ...nonPrivateKey, [key]: task[key] }), {})
      })
      res.json(tasks)
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        // res.json({ Status: 'No category' })
        res.json([])
      } else {
        res.json({ Status: 'Some error', errorLog: err })
      }
    })
})

// List of exist category (names of JSON files in storage directory)
server.get(['/api/v1/categories'], (req, res) => {
  try {
    readdir(fsStore)
      .then((files) => {
        return files.reduce((categoryNames, fileName) => {
          const lastDotIndex = fileName.lastIndexOf('.')
          const fileExtention = fileName.slice(lastDotIndex)
          if (fileExtention === '.json') {
            const categoryName = fileName.slice(0, lastDotIndex)
            categoryNames.push(categoryName)
          }
          return categoryNames
        }, [])
      })
      .then((categoryNames) => {
        res.json({ Categories: categoryNames })
        console.log(categoryNames)
      });
  } catch (err) {
    console.error(err);
  }
})


// Add some task. Если файл категории не существует - он будет создан.
server.post('/api/v1/tasks/:category', (req, res) => {
  const { category } = req.params
  const fileName = `${fsStore}/${category}.json`
  const newTask = {
    taskId: nanoid(),
    title: req.body.title,
    status: 'new',
    _isDeleted: false,
    _createdAt: +new Date(),
    _deletedAt: null
  }

  readFile(fileName, { encoding: 'utf8' })
    .then((text) => {
      const existedTasks = JSON.parse(text)
      const taskList = [...existedTasks, newTask]
      writeFile(fileName, JSON.stringify(taskList), { encoding: 'utf8' })
      res.json({ Status: 'Ok!' })
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        const taskList = [newTask]
        writeFile(fileName, JSON.stringify(taskList), { encoding: 'utf8' })
        res.json({ Status: 'Ok!' })
      } else {
        res.json({ Status: 'JSON parse error!' })
      }
    })
})

// Update title or status of task. Title must be not empty and status from fixed list
server.patch('/api/v1/tasks/:category/:id', (req, res) => {
  const { category, id } = req.params
  const fileName = `${fsStore}/${category}.json`
  const safeStatuses = ['done', 'new', 'in progress', 'blocked']

  let isSomeToWrite = false
  let withError = false

  const patch = {};
  const errorLog = { status: 'error' }

  const newTitle = req.body.title
  const newStatus = req.body.status

  if (typeof newTitle !== 'undefined') {
    if (newTitle !== '') {
      patch.title = newTitle
      isSomeToWrite = true
    } else {
      withError = true
      errorLog.taskTitle = 'title can\'t be empty'
    }
  }

  if (typeof newStatus !== 'undefined') {
    if (safeStatuses.includes(newStatus)) {
      patch.status = newStatus
      isSomeToWrite = true
    } else {
      withError = true
      errorLog.taskStatus = 'incorrect status'
    }
  }

  if (isSomeToWrite && !withError) {
    readFile(fileName, { encoding: 'utf8' })
      .then((text) => {
        const tasks = JSON.parse(text)
        const indexOfTask = tasks.findIndex((task) => task.taskId === id)
        if (indexOfTask !== -1) {
          tasks[indexOfTask] = { ...tasks[indexOfTask], ...patch }
          console.log('tasks[indexOfTask]')
          console.log(tasks[indexOfTask])
          writeFile(fileName, JSON.stringify(tasks), { encoding: 'utf8' })
          res.json({ Status: 'Ok' })
        } else {
          res.json({ Status: 'Error', Message: 'Element not found' })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    res.status(501)
    res.json(errorLog)
  }
})

// Функция меняет свойство _isDeleted объекта задачи с нужным id на TRUE
server.delete('/api/v1/tasks/:category/:id', (req, res) => {
  const { category, id } = req.params
  const fileName = `${fsStore}/${category}.json`

  readFile(fileName, { encoding: 'utf8' })
    .then((text) => {
      const tasks = JSON.parse(text)
      const indexOfTask = tasks.findIndex((task) => task.taskId === id)
      if (indexOfTask !== -1) {
        let field = '_isDeleted'
        tasks[indexOfTask][field] = true
        field = '_deletedAt'
        tasks[indexOfTask][field] = +new Date()
        writeFile(fileName, JSON.stringify(tasks), { encoding: 'utf8' })
        res.json({ Status: 'Ok' })
      } else {
        res.json({ Status: 'Error', Message: 'Element not found' })
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => { })
    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
