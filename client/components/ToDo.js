import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

import Head from './head'
import ListOfTasks from './Todo/ListOfTasks';
import Input from './Todo/Input';

const ToDo = () => {
  const { category } = useParams()
  const [tasks, setTasks] = useState([])

  // Functions, that work with API
  const apiLoad = () => {
    axios.get(`/api/v1/tasks/${category}`).then(data => {
      console.log('Updated list of tasks...')
      setTasks(data.data)
    })
  }
  const apiCreate = (title) => {
    axios.post(`/api/v1/tasks/${category}`, { title }).then(data => {
      apiLoad();
      console.log(data.data.Status)
    })
  }
  const apiPatch = (id, update) => {
    axios.patch(`/api/v1/tasks/${category}/${id}`, update).then(data => {
      apiLoad();
      console.log(data.data.Status)
    })
  }
  const apiPatchTitle = (id, newTitle) => {
    const update = { title: newTitle }
    apiPatch(id, update)
  }
  const apiPatchStatus = (id, newStatus) => {
    const update = { status: newStatus }
    apiPatch(id, update)
  }
  const apiDelete = (id) => {
    axios.delete(`/api/v1/tasks/${category}/${id}`).then(data => {
      apiLoad();
      console.log(data.data.Status)
    })
  }

  // Loading tasks at start and when category changed
  useEffect(() => { apiLoad() }, [category])

  return (
    <div>
      <Head title="Hello" />
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="main-wrapper bg-white rounded shadow m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="header mb-4 p-6 bg-indigo-200	">
            <h1 className="text-xl text-center text-grey-darkest">One More Todo List...</h1>
          </div>
          <div className="pr-6 pl-6 ">
            <h2 className="text-lg text-grey-darkest text-center">
              Active category: {(typeof category !== "undefined") ? `${category}` : 'not selected...'}
            </h2>
            <div className="text-sm text-grey-darkest text-center">
              <Link className="mx-1" to='/home'>all</Link>
              <Link className="mx-1" to='/work'>day</Link>
              <Link className="mx-1" to='/work'>week</Link>
              <Link className="mx-1" to='/work'>mounth</Link>
            </div>
          </div>
          <div>
            <Input action={apiCreate} />
          </div>
          <div>
            <ListOfTasks
              tasks={tasks}
              doPatchTitle={apiPatchTitle}
              doPatchStatus={apiPatchStatus}
              doDelete={apiDelete}
            />
          </div>
          <div>
            <Input action={apiCreate} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ToDo)
