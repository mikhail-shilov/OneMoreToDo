import React from 'react'
import { INPROGRESS, DONE, BLOCKED } from '../../../api/api'

const Status = (props) => {

  const InProgress = () => (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 mx-1 border-2 w-28 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => { doPatchStatus(taskId, INPROGRESS) }}>In progress</button>)

  const Blocked = () => (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 mx-1 border-2 w-28 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => { doPatchStatus(taskId, BLOCKED) }}>Block</button>)

  const Resume = () => (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 mx-1 mr-1 border-2 w-28 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => { doPatchStatus(taskId, INPROGRESS) }}>Resume</button>)

  const Done = () => (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 mx-1 mr-1 border-2 w-28 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => { doPatchStatus(taskId, DONE) }}>Done</button>)

  return (
    <>
      {(status === 'new') && <InProgress />}
      {(status === 'in progress') && <><Blocked /> <Done /></>}
      {(status === 'blocked') && <Resume />}
    </>
  )
}

export default Status
