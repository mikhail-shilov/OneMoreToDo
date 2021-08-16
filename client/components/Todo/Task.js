import React, { useState } from 'react'

const Task = (props) => {
  const { taskId, title, status, doPatchTitle, doPatchStatus, doDelete } = props
  const [editMode, setEditMode] = useState(false)
  const [titleValue, setTitleValue] = useState(title)

  const DONE = 'done'
  const INPROGRESS = 'in progress'
  const BLOCKED = 'blocked'

  const editHandler = (event) => {
    setTitleValue(event.target.value)
  }

  const ButtonEdit = () => (
    <button
      type="button"
      className="flex-shrink-0 text-sm px-1 py-1 my-1 mx-1 border-2 w-16	rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => { setEditMode(true) }}>Edit</button>)

  const ButtonSave = () => (
    <button
      type="button"
      className="flex-shrink-0 text-sm	px-1 py-1 my-1 mx-1 border-2 w-16	rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => {
        doPatchTitle(taskId, titleValue)
        setEditMode(false)
      }}>Save</button>)

  const ButtonInProgress = () => (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 ml-2 mr-1 border-2 w-28 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => { doPatchStatus(taskId, INPROGRESS) }}>In progress</button>)

  const ButtonBlocked = () => (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 ml-2 mr-1 border-2 w-28 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => { doPatchStatus(taskId, BLOCKED) }}>Block</button>)

  const ButtonResume = () => (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 ml-2 mr-1 border-2 w-28 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => { doPatchStatus(taskId, INPROGRESS) }}>Resume</button>)

  const ButtonDone = () => (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 ml-2 mr-1 border-2 w-28 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => { doPatchStatus(taskId, DONE) }}>Done</button>)

  const ButtonRemove = () => (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 ml-2 mr-1 border-2 w-28 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={() => { doDelete(taskId) }}>Remove</button>)

  // const Title = () => (<a onClick={() => { setEditMode(true) }}>{title}</a>)

  const EditTitle = () => (
    <input
      name="titleEditor"
      type='text'
      className="shadow flex-grow appearance-none border rounded py-2 px-3 mr-4 text-grey-darker"
      value={titleValue}
      onChange={editHandler}
    />
  )

  const Title = () => (
    <a className='flex-grow justify-center'>
      {title}
    </a>

  )

  return (
    <div className="flex flex-col gap-1.5 my-px p-2  items-center bg-indigo-50	">
      <div className="flex justify-center items-center border w-full p-2">
        {editMode ? <>{EditTitle()} <ButtonSave /></> : <>{Title()} <ButtonEdit /></>}
      </div>
      <div>
        {(status === 'new') && <ButtonInProgress />}
        {(status === 'in progress') && <><ButtonBlocked /> <ButtonDone /></>}
        {(status === 'blocked') && <ButtonResume />}
        <ButtonRemove />
      </div>
    </div>
  )
}

export default Task
