import React from 'react'
import Task from './Task'

const ListOfTasks = (props) => {

  const list = props.tasks.map((task) => {
    return (
      <Task
        key={task.taskId}
        id={task.taskId}
        title={task.title}
        status={task.status}
      />
    )
  })

  return (
    <div>
      {list}
    </div>
  )
}

export default ListOfTasks
