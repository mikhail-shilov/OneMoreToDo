import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

import Head from './head'
import ListOfTasks from './Todo/ListOfTasks';
import Input from './Todo/Input';

const Dummy = () => {
  const { category } = useParams()
  const [tasks, setTasks] = useState([{ ff: "dfg" }, { fs: 'sfsdf' }])

  // Loading tasks at start and when category changed
  useEffect(
    () => {
      axios.get(`/api/v1/tasks/${category}`)
        .then(data => {
          console.log('Loaded:')
          console.log(data.data)
          setTasks(data.data)
        })
        .catch(err => console.log(err))
    },
    [category]
  )

  const taskCreate = (title) => {
    axios.post(`/api/v1/tasks/${category}`, { title }).then(data => { console.log(data.data) })
  }
  // const taskPatch = (id, update) => { }
  // const taskDelete = (id) => { }

  return (
    <div>
      <Head title="Hello" />
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">One More More Todo List...</h1>
            <h2 className="text-grey-darkest">
              Active category: {(typeof category !== "undefined") ? `${category}!` : 'not selected...'}
            </h2>
            <h2><Link to='/home'>home</Link> <Link to='/work'>work</Link> </h2>
            <Input action={taskCreate} />
          </div>
          <div>
            <ListOfTasks tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  )
}


Dummy.propTypes = {}

export default React.memo(Dummy)
