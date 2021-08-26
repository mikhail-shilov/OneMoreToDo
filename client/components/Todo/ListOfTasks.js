import React, { useEffect, useState } from 'react'
import Input from './Input'
import Task from './task/Task'
import api from '../../api/api'


const ListOfTasks = (props) => {
  const { category, timespan } = props

  const [isLoadingTasks, setLoadingTasks] = useState(false)
  const [listTasks, setTasks] = useState([])

  const refresh = () => {
    console.log('Refresh tasks...')
    api.loadTasks(category, timespan).then(result => { setTasks(result) })
  }

  // Loading tasks at start and when category changed
  useEffect(() => {
    if (typeof category !== 'undefined') {
      console.log('Loading tasks...')
      console.log(`Category: ${category}, timespan: ${timespan}`)

      setLoadingTasks(true)
      api.loadTasks(category, timespan)
        .then(result => {
          if (result.status === 'ok') {
            console.log('Task loaded.')
            setTasks(result.tasks)
          } else {
            setTasks([])
            console.log('Error! Task not loaded.')
          }
          setLoadingTasks(false)
        })
    }
  }, [category, timespan])


  const items = listTasks.map((task) => {
    return (
      <Task
        category={props.category}
        key={task.taskId}
        taskId={task.taskId}
        title={task.title}
        status={task.status}
        refresh={refresh}
      />
    )
  })

  const noTasks = () => (
    <div className='text-center'>
      No items to display...  {isLoadingTasks}
    </div>)

  return (
    <>
      <div>
        <Input category={category} refresh={refresh} />
      </div>
      <div>
        {listTasks.length !== 0 ? items : noTasks()}
      </div>
      <div>
        <Input category={category} refresh={refresh} />
      </div>
    </>
  )
}

export default ListOfTasks
