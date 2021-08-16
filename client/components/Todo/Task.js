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
      className="flex-no-shrink p-2 ml-4 mr-1 border-2 w-20 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => { setEditMode(true) }}>Edit</button>)

  const ButtonSave = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-4 mr-1 border-2 w-20 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => {
        doPatchTitle(taskId, titleValue)
        setEditMode(false)
      }}>Save</button>)

  const ButtonInProgress = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-2 mr-1 border-2 w-28 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => { doPatchStatus(taskId, INPROGRESS) }}>In progress</button>)

  const ButtonBlocked = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-2 mr-1 border-2 w-28 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => { doPatchStatus(taskId, BLOCKED) }}>Block</button>)

  const ButtonResume = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-2 mr-1 border-2 w-28 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => { doPatchStatus(taskId, INPROGRESS) }}>Resume</button>)

  const ButtonDone = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-2 mr-1 border-2 w-28 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => { doPatchStatus(taskId, DONE) }}>Done</button>)

  const ButtonRemove = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-2 mr-1 border-2 w-28 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => { doDelete(taskId) }}>Remove</button>)

  // const Title = () => (<a onClick={() => { setEditMode(true) }}>{title}</a>)

  const EditTitle = () => (
    <input
      name="titleEditor"
      type='text'
      className="shadow appearance-none border rounded py-2 px-3 mr-4 text-grey-darker"
      value={titleValue}
      onChange={editHandler}
    />
  )

  return (
    <div className="flex flex-col gap-4 my-px px-6 py-2 items-center bg-indigo-50	">
      <div>
        {editMode ? <>{EditTitle()} <ButtonSave /></> : <>{title} <ButtonEdit /></>}
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
