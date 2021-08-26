import React, { useState } from 'react'
import api from '../../api/api'

const Input = (props) => {
  const [value, setValue] = useState('')

  const inputHandler = (event) => {
    setValue(event.target.value)
  }

  const addHandler = () => {
    console.log(`add...${value}`)
    api.create(props.category, value).then(result => {
      console.log(result)
      props.refresh()
    })
    setValue('')
  }

  const keyHandler = (event) => {
    if(event.key === 'Enter'){
      addHandler()
    }
  }


  return (
    <div className="flex w-full my-4 px-6">
      <input
        className="flex-grow shadow appearance-none border rounded py-2 px-3 mr-4 text-grey-darker"
        placeholder="Add Todo"
        value={value}
        onChange={inputHandler}
        onKeyPress={keyHandler} />
      <button
        type="button"
        className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
        onClick={addHandler}      >
        Add
      </button>
    </div>
  )
}

export default Input
