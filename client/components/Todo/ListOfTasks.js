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
        doPatchTitle={props.doPatchTitle}
        doPatchStatus={props.doPatchStatus}
        doDelete={props.doDelete}
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
