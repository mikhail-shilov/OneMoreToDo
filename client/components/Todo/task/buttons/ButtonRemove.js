import React from 'react'

const ButtonRemove = () => {

  const handler = (event) => {
    () => { setEditMode(true) }
  }

  return (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 mx-1 border-2 w-28 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={handler}>
      Remove
    </button>
  )
}

export default ButtonRemove
