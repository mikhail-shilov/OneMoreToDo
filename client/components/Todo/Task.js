import React from 'react'

const Task = (props) => {
  const { taskId, status, patchStatus } = props

  const DONE = 'done'
  const INPROGRESS = 'in progress'
  const BLOCKED = 'blocked'

  const ButtonInProgress = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => {
        patchStatus(taskId, INPROGRESS)
      }}
    >In progress</button>)
  const ButtonBlocked = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => {
        patchStatus(taskId, BLOCKED)
      }}

    >
      Blocked
    </button>)
  const ButtonResume = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => {
        patchStatus(taskId, INPROGRESS)
      }}
    >
      Resume
    </button>)
  const ButtonDone = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => {
        patchStatus(taskId, DONE)
      }}
    >
      Done
    </button>)

  return (
    <div className="flex mb-4 items-center">
      <p className="w-full text-grey-darkest">
        {props.title}
      </p>
      {(status === 'new') && <ButtonInProgress />}
      {(status === 'in progress') && <ButtonBlocked />}
      {(status === 'in progress') && <ButtonDone />}
      {(status === 'blocked') && <ButtonResume />}

    </div>
  )
}

export default Task
