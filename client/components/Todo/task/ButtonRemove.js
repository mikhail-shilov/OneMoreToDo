import React from 'react'
import api from '../../../api/api'

const ButtonRemove = (props) => {
  const { category, taskId, refresh } = props

  const handler = () => {
    api.delete(category, taskId)
      .then(() => { refresh() })
  }

  return (
    <button
      type="button"
      className="flex-no-shrink px-2 py-1 border-2 w-20 rounded hover:text-gray-400 text-green border-green hover:bg-yellow-500"
      onClick={handler}>
      Remove
    </button>
  )
}

export default ButtonRemove
