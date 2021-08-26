import React from 'react'
import api, { INPROGRESS, DONE, BLOCKED } from '../../../api/api'

const FIELD_STATUS = 'status'

const Status = (props) => {
  const { category, taskId, status, refresh } = props

  const InProgress = () => (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 mx-1 border-2 w-20 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => {
        api.patch(category, taskId, FIELD_STATUS, INPROGRESS)
          .then(() => { refresh() })
      }}>In progress</button>)

  const Blocked = () => (
    <button
      type="button"
      className="flex-no-shrink text-sm  px-2 py-1 mx-1 border-2 w-20 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => {
        api.patch(category, taskId, FIELD_STATUS, BLOCKED)
          .then(() => { refresh() })
      }}>Block</button>)

  const Resume = () => (
    <button
      type="button"
      className="flex-no-shrink text-sm px-2 py-1 mx-1 mr-1 border-2 w-16	rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => {
        api.patch(category, taskId, FIELD_STATUS, INPROGRESS)
          .then(() => { refresh() })
      }}>Resume</button>)

  const Done = () => (
    <button
      type="button"
      className="flex-no-shrink text-sm px-2 py-1 mx-1 mr-1 border-2 w-16	rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => {
        api.patch(category, taskId, FIELD_STATUS, DONE)
          .then(() => { refresh() })
      }}>Done</button>)

  return (
    <>
      <a className='ml-px mr-4'>Now: {status}</a>
      {(status === 'new') && <InProgress />}
      {(status === 'in progress') && <><Blocked /> <Done /></>}
      {(status === 'blocked') && <Resume />}
    </>
  )
}

export default Status
