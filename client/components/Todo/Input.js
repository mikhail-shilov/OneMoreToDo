import React, { useState } from 'react'

const Input = (props) => {
  const [value, setValue] = useState('')
  const inputHandler = (event) => {
    setValue(event.target.value)
  }

  const addHandler = () => {
    console.log(`add...${value}`)
    props.action(value)
    setValue('')
  }

  return (
    <div>
      <input
        className="shadow appearance-none border rounded py-2 px-3 mr-4 text-grey-darker"
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
