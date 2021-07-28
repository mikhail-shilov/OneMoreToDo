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

const { readFile, writeFile } = require('fs').promises

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
server.get('/api/v1/tasks/:category', (req, res) => {
  const { category } = req.params
  readFile(`${fsStore}/${category}.json`, { encoding: 'utf8' })
    .then((text) => {
      const output = JSON.parse(text)
      res.json(output)
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        res.json({ Status: "No category" })
      } else {
        res.json({ 'Status': 'Some error', 'errorLog': err })
      }
    })
})

server.get('/api/v1/tasks/:category/:timespan', (req, res) => {
  const { category, timespan } = req.params
  res.json({ category, timespan })
})

// Добавление задачи. Если файл категории не существует - он будет создан.
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
        console.log(`${category}:`)
        console.log(taskList.map((item) => `${item.taskId}: ${item.title}`))
        writeFile(fileName, JSON.stringify(taskList), { encoding: 'utf8' })
        res.json({ Status: 'Ok!' })
      } else {
        res.json({ Status: "JSON parse error!" })
      }
    })
})

server.patch('/api/v1/tasks/:category/:id', (req, res) => {
  const { id } = req.params
  const updateTask = req.body
  const message = `Id ${id} patched`
  res.json({ message, updateTask })
})

// Функция меняет свойство _isDeleted объекта задачи с нужным id на TRUE
server.delete('/api/v1/tasks/:category/:id', (req, res) => {
  const { category, id } = req.params
  const fileName = `${fsStore}/${category}.json`

  readFile(fileName, { encoding: 'utf8' })
    .then((text) => {
      const tasks = JSON.parse(text)
      const indexOfTask = tasks.findIndex((task) => task.taskId === id)
      const field = '_isDeleted'
      if (indexOfTask !== -1) {
        tasks[indexOfTask][field] = true
        writeFile(fileName, JSON.stringify(tasks), { encoding: 'utf8' })
        res.json({ Status: 'Ok', data: tasks })
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
