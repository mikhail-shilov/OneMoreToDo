import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile } = require("fs").promises;  


require('colors')

let Root
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []

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

  readFile(`${__dirname}/${category}.json`, { encoding: "utf8" })  
  .then(text => {  
    res.json(JSON.parse(text))
  })   
  .catch(err => {  
    res.json({ error: err })
  })  

  console.log(category)
})

server.get('/api/v1/tasks/:category/:timespan', (req, res) => {
  const { category, timespan } = req.params
  console.log(category)
  res.json({ category, timespan })
})

server.post('/api/v1/tasks/:category', (req, res) => {
  // const { category } = req.params
  const newTask = req.body;
  const message = `New task is created`
  res.json({ message , Content: newTask })
})

server.patch('/api/v1/tasks/:category/:id', (req, res) => {
  const { id } = req.params
  const updateTask = req.body;
  const message = `Id ${id} patched`
  res.json({ message, updateTask })
})

server.delete('/api/v1/tasks/:category/:id', (req, res) => {
  const { category, id } = req.params
  console.log(category)
  res.json({ 'Id deleted succesful': id })
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
