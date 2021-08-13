import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

import Head from './head'
import ListOfTasks from './Todo/ListOfTasks';
import Input from './Todo/Input';

const Dummy = () => {
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
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">One More More Todo List...</h1>
            <h2 className="text-grey-darkest">
              Active category: {(typeof category !== "undefined") ? `${category}!` : 'not selected...'}
            </h2>
            <h2><Link to='/home'>home</Link> <Link to='/work'>work</Link> </h2>
            <Input
              action={apiCreate}
            />
          </div>
          <div>
            <ListOfTasks
              tasks={tasks}
              doPatchTitle={apiPatchTitle}
              doPatchStatus={apiPatchStatus}
              doDelete={apiDelete}
            />
          </div>
        </div>
      </div>
    </div>
  )
}


Dummy.propTypes = {}

export default React.memo(Dummy)
