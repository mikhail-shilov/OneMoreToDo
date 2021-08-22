import React from 'react'

import Title from './Title'
import ButtonRemove from './ButtonRemove'

const Task = (props) => {
  const { category, taskId, title, status, refresh, doPatchStatus } = props

  const DONE = 'done'
  const INPROGRESS = 'in progress'
  const BLOCKED = 'blocked'

  const ButtonInProgress = () => (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 mx-1 border-2 w-28 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => { doPatchStatus(taskId, INPROGRESS) }}>In progress</button>)

  const ButtonBlocked = () => (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 mx-1 border-2 w-28 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => { doPatchStatus(taskId, BLOCKED) }}>Block</button>)

  const ButtonResume = () => (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 mx-1 mr-1 border-2 w-28 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => { doPatchStatus(taskId, INPROGRESS) }}>Resume</button>)

  const ButtonDone = () => (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 mx-1 mr-1 border-2 w-28 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => { doPatchStatus(taskId, DONE) }}>Done</button>)

  return (
    <div className="flex flex-col gap-1.5 my-px p-2  items-center bg-indigo-50">
      <Title category={category} taskId={taskId} title={title} refresh={refresh} />

      <div>
        {(status === 'new') && <ButtonInProgress />}
        {(status === 'in progress') && <><ButtonBlocked /> <ButtonDone /></>}
        {(status === 'blocked') && <ButtonResume />}
        <ButtonRemove category={category} taskId={taskId} refresh={refresh} />
      </div>
    </div>
  )
}

export default Task
