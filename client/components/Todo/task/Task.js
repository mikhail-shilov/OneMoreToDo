import React from 'react'

import Title from './Title'
import ButtonStatus from './ButtonStatus'
import ButtonRemove from './ButtonRemove'

const Task = (props) => {
  const { category, taskId, title, status, refresh } = props

  return (
    <div className="flex flex-col gap-1.5 my-px p-2  items-center bg-indigo-50">
      <Title category={category} taskId={taskId} title={title} refresh={refresh} />

      <div>

        <ButtonStatus category={category} taskId={taskId} status={status} refresh={refresh} />

        <ButtonRemove category={category} taskId={taskId} refresh={refresh} />
      </div>
    </div>
  )
}

export default Task
