import React from 'react'
import api from '../../../../api/api'

const ButtonSave = () => {



  const handler = (event) => {
    () => {
      api.patch(category, taskId, 'status', 'some...')
      setEditMode(true)
    }
  }

  return (
    <button
      type="button"
      className="flex-shrink-0 text-sm px-1 py-1 my-1 mx-1 border-2 w-16	rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={handler}>
      Save
    </button>
  )
}

export default ButtonSave
