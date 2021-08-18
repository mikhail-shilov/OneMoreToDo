import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api/api'

import Head from './head'
import ListOfTasks from './Todo/ListOfTasks'
import ListCategories from './Todo/ListCategories'
import Input from './Todo/Input'

const ToDo = () => {
  const { category, timespan } = useParams()

  const [listCategoryes, setCategoryes] = useState([])
  const [listTasks, setTasks] = useState([])

  // Loading categories at start
  useEffect(() => {
    api.loadCategories().then(result => { setCategoryes(result) })
  }, [category])

  // Loading tasks at start and when category changed
  useEffect(() => {
    api.loadTasks(category, timespan).then(result => { setTasks(result) })
  }, [category, timespan])

  return (
    <div>
      <Head title="Hello" />
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="main-wrapper bg-white rounded shadow m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="header mb-4 p-6 bg-indigo-200	">
            <h1 className="text-xl text-center text-grey-darkest">One More Todo List...</h1>
          </div>
          <div className="pr-6 pl-6 ">
            <h2 className="text-lg text-grey-darkest text-center">
              Active category: {(typeof category !== "undefined") ? `${category}` : 'not selected...'}
            </h2>
            <div className="text-xs text-center mb-1"><Link to='/'>Go to categories list</Link></div>
            <div className="text-sm text-grey-darkest text-center">
              <Link className="mx-1" to={`/${category}/`}>all</Link>
              <Link className="mx-1" to={`/${category}/day`}>day</Link>
              <Link className="mx-1" to={`/${category}/week`}>week</Link>
              <Link className="mx-1" to={`/${category}/mounth`}>mounth</Link>
            </div>
          </div>
          <div>
            <Input />
          </div>
          <div>
            {(typeof category === 'undefined')
              ? <ListCategories
                categories={listCategoryes} />
              : <ListOfTasks
                tasks={listTasks} />
            }
          </div>
          <div>
            <Input />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ToDo)
