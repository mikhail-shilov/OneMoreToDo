import React, { useState } from 'react'
import api from '../../../api/api'

const Title = (props) => {
  const { category, taskId, title, refresh } = props
  const [editMode, setEditMode] = useState(false)
  const [titleValue, setTitleValue] = useState(title)

  const inputHandler = (event) => {
    setTitleValue(event.target.value)
  }

  const doEdit = () => {
    setEditMode(true)
  }

  const doSave = () => {
    api.patch(category, taskId, 'title', titleValue)
      .then(() => { 
        setEditMode(false)
        refresh()
       })
      .catch(err => { console.log(err) })
  }

  const EditorButton = () => (
    <button
      type="button"
      className="flex-shrink-0 text-sm px-1 py-1 my-1 mx-1 border-2 w-16	rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={!editMode ? doEdit : doSave}
    >
      {!editMode ? 'Edit' : 'Save'}
    </button>)

  const EditTitle = () => (
    <input
      name="titleEditor"
      type='text'
      className="shadow flex-grow appearance-none border rounded py-2 px-3 mr-4 text-grey-darker"
      value={titleValue}
      onChange={inputHandler}
    />
  )

  const Title2 = () => (
    <a className='flex-grow justify-center'>
      {title}
    </a>

  )

  return (
    <div className="flex justify-center items-center border w-full p-2">
      {editMode ? EditTitle() : Title2()}
      {EditorButton()}
    </div>
  )
}

export default Title
