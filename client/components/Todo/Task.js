import React, { useState } from 'react'

const Task = (props) => {
  const { taskId, title, status, doPatchStatus, doDelete } = props
  const [editMode, setEditMode] = useState(false)
  const [titleValue, setTitleValue] = useState(title)

  const DONE = 'done'
  const INPROGRESS = 'in progress'
  const BLOCKED = 'blocked'

  const ButtonEdit = () => (
    <button
      type="button"
      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
      onClick={() => { setEditMode(!editMode) }}>Edit</button>)

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
      className="shadow appearance-none border rounded py-2 px-3 mr-4 text-grey-darker"
      value={titleValue}
      onChange={(event) => { setTitleValue(event.target.value) }}
      onClick={() => { setEditMode(false) }}

    />
  )

  return (
    <div className="flex mb-4 items-center">
      <ButtonEdit />
      <p className="w-full text-grey-darkest">
        {editMode ? <EditTitle /> : title}
      </p>
      {(status === 'new') && <ButtonInProgress />}
      {(status === 'in progress') && <><ButtonBlocked /> <ButtonDone /></>}
      {(status === 'blocked') && <ButtonResume />}
      <ButtonRemove />

    </div>
  )
}

export default Task
