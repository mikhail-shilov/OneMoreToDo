import React from 'react'
import Task from './task/Task'

const ListOfTasks = (props) => {
  const { tasks } = props

  const items = (typeof props.tasks === 'undefined') ? [] : tasks.map((task) => {
    return (
      <Task
        category={props.category}
        key={task.taskId}
        taskId={task.taskId}
        title={task.title}
        status={task.status}
        refresh={props.refresh}
      />
    )
  })

  const noTasks = () => (
    <div className='text-center'>
      No items to display...
    </div>)




  return (
    <div>
      {tasks.length !== 0 ? items : noTasks()}
    </div>
  )
}

export default ListOfTasks
