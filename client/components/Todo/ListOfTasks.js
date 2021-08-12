import React from 'react'
import Task from './Task'

const ListOfTasks = (props) => {

  const list = props.tasks.map((task) => {
    return (
      <Task
        key={task.taskId}
        taskId={task.taskId}
        title={task.title}
        status={task.status}
        patchTitle={props.patchTitle}
        patchStatus={props.pathStatus}
        delete={props.delete}
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
