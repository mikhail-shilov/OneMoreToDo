import React from 'react'
import Task from './task/Task'

const ListOfTasks = (props) => {

  const list = (typeof props.tasks === 'undefined')? []: props.tasks.map((task) => {
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
