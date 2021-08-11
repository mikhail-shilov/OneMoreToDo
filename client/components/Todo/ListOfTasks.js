import React from 'react'
import Task from './Task'

const ListOfTasks = () => {
  return (
    <div>
      <Task title='Новая задача' status='new' />
      <Task title='Законченная задача (уф)' status='done' />
      <Task title='Надо пахать!' status='In progress' />
    </div>
  )
}

export default ListOfTasks
