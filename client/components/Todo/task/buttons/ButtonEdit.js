import React from 'react'

const ButtonEdit = () => {

  const handler = (event) => {
    () => { setEditMode(true) }
  }

  return (
    <button
      type="button"
      className="flex-shrink-0 text-sm px-1 py-1 my-1 mx-1 border-2 w-16	rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={handler}>
      Edit
    </button>
  )
}

export default ButtonEdit
