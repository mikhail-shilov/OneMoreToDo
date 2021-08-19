import React from 'react'
import Task from './task/Task'

const ListOfTasks = (props) => {
  const list = (typeof props.tasks === 'undefined') ? [] : props.tasks.map((task) => {
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

  return (
    <div>
      {list}
    </div>
  )
}

export default ListOfTasks
