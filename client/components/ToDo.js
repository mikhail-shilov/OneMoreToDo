import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

import Head from './head'

const Dummy = () => {
  const { category } = useParams()
  const [tasks, setTasks] = useState([{ ff: "dfg" }, {fs: 'sfsdf'}])

  useEffect(
    () => {
      axios.get(`/api/v1/tasks/${category}`)
      .then(data => {
        console.log(data.data)
        setTasks(data.data)
      })
      .catch(err => console.log(err))
    },
    []
  )



  return (
    <div>
      <Head title="Hello" />
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">One More Todo List...</h1>
            <h2 className="text-grey-darkest">Active category: {(typeof category !== "undefined") ? `${category}!` : 'not selected...'}</h2>
            <h2 className="text-grey-darkest">State is {tasks[0].ff}</h2>

            <div className="flex mt-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
              />
              <button
                type="button"
                className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
              >
                Add
              </button>
            </div>
          </div>
          <div>
            <div className="flex mb-4 items-center">
              <p className="w-full text-grey-darkest">
                Add another component to Tailwind Components
              </p>
              <button
                type="button"
                className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
              >
                Done
              </button>
              <button
                type="button"
                className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
              >
                Remove
              </button>
            </div>
            <div className="flex mb-4 items-center">
              <p className="w-full line-through text-green">
                Submit Todo App Component to Tailwind Components
              </p>
              <button
                type="button"
                className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey"
              >
                Not Done
              </button>
              <button
                type="button"
                className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


Dummy.propTypes = {}

export default React.memo(Dummy)
