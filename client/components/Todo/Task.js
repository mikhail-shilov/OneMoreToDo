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
      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => { setEditMode(true) }}>Edit</button>)

  const ButtonSave = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => {
        doPatchTitle(taskId, titleValue)
        setEditMode(false)
      }}>Save</button>)

  const ButtonInProgress = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => { doPatchStatus(taskId, INPROGRESS) }}>In progress</button>)

  const ButtonBlocked = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => { doPatchStatus(taskId, BLOCKED) }}>Blocked</button>)

  const ButtonResume = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => { doPatchStatus(taskId, INPROGRESS) }}>Resume</button>)

  const ButtonDone = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => { doPatchStatus(taskId, DONE) }}>Done</button>)

  const ButtonRemove = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
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
    <div className="flex mb-4 items-center">
      {editMode ? <>{EditTitle()} <ButtonSave /></> : <>{title} <ButtonEdit /></>}
      {(status === 'new') && <ButtonInProgress />}
      {(status === 'in progress') && <><ButtonBlocked /> <ButtonDone /></>}
      {(status === 'blocked') && <ButtonResume />}
      <ButtonRemove />

    </div>
  )
}

export default Task
