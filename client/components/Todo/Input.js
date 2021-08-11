import React, { useState } from 'react'

const Input = (props) => {
  const [value, setValue] = useState('')

  const inputHandler = (e) => {
    setValue(e.target.value)
  }
  const addHandler = () => {
    props.addTask(value)
  }

  return (
    <div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
        placeholder="Add Todo"
        value={value}
        onChange={inputHandler}
      />
      <button
        type="button"
        className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
        onClick={addHandler}
      >
        Add
      </button>
    </div>
  )
}

export default Input
