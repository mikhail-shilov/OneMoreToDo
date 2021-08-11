import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

import Head from './head'
import ListOfTasks from './Todo/ListOfTasks';
import Input from './Todo/Input';

const Dummy = () => {
  const { category } = useParams()
  const [tasks, setTasks] = useState([{ ff: "dfg" }, { fs: 'sfsdf' }])

  useEffect(
    () => {
      axios.get(`/api/v1/tasks/${category}`)
        .then(data => {
          console.log(data.data)
          setTasks(data.data)
          console.log(tasks)
        })
        .catch(err => console.log(err))
    },
    []
  )

  return (
    <div>
      <Head title="Hello" />
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">One More More Todo List...</h1>
            <h2 className="text-grey-darkest">Active category: {(typeof category !== "undefined") ? `${category}!` : 'not selected...'}</h2>
            <Input />
          </div>
          <div>
            <ListOfTasks />
          </div>
        </div>
      </div>
    </div>
  )
}


Dummy.propTypes = {}

export default React.memo(Dummy)
