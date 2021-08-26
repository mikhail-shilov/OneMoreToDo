import React from 'react'

import Title from './Title'
import ButtonStatus from './ButtonStatus'
import ButtonRemove from './ButtonRemove'
import { DONE } from '../../../api/api'

const Task = (props) => {
  const { category, taskId, title, status, refresh } = props

  return (
    <div className="flex flex-col gap-1.5 my-px p-2  items-center bg-indigo-50">
      <Title
        category={category}
        taskId={taskId}
        title={title}
        isDone={(status === DONE)}
        refresh={refresh} />
      <div className="flex w-full text-sm ">
        <div className='flex-grow'>
          <ButtonStatus category={category} taskId={taskId} status={status} refresh={refresh} />
        </div>
        <div className='flex-grow-0'>
          <ButtonRemove category={category} taskId={taskId} refresh={refresh} />
        </div>
      </div>
    </div>
  )
}

export default Task
