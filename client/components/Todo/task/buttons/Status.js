import React from 'react'
import { INPROGRESS, DONE, BLOCKED } from '../../../../api/api'

const Status = (props) => {

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
    <>
      {(status === 'new') && <ButtonInProgress />}
      {(status === 'in progress') && <><ButtonBlocked /> <ButtonDone /></>}
      {(status === 'blocked') && <ButtonResume />}
    </>
  )
}

export default Status
