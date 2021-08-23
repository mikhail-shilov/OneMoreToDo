import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api/api'

import Head from './head'
import ListOfTasks from './Todo/ListOfTasks'
import ListCategories from './Todo/ListCategories'
import Input from './Todo/Input'
import Placeholder from './Todo/Placeholder'

const ToDo = () => {
  const { category, timespan } = useParams()

  const [activeCategory, setActiveCategory] = useState(null)
  const [listTasks, setTasks] = useState([])

  const [isLoadingTasks, setLoadingTasks] = useState(false)

  const refresh = () => {
    console.log('Refresh tasks...')
    api.loadTasks(category, timespan).then(result => { setTasks(result) })
  }

  // Set active categorie to state
  useEffect(() => {
    setActiveCategory(category)
  }, [category])



  // Loading tasks at start and when category changed
  useEffect(() => {
    console.log('UseEffect2')
    if (typeof category !== 'undefined') {
      setLoadingTasks(true)
      api.loadTasks(category, timespan)
      .then(result => {
        setTasks(result)
        setLoadingTasks(false)
      })
    }
  }, [category, timespan])

  const MainPage = () => (
    <>
      <div>
        <Input category={category} refresh={refresh} />
      </div>
      <div>
        {(typeof category === 'undefined')
          ? <ListCategories />
          : <ListOfTasks
            category={activeCategory}
            tasks={listTasks}
            refresh={refresh} />
        }
      </div>
      <div>
        <Input category={category} refresh={refresh} />
      </div>
    </>
  )

  return (
    <div>
      <Head title={(typeof category !== "undefined") ? `${category}` : 'please select category'} />
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
          {!isLoadingTasks ? MainPage() : <Placeholder />}

        </div>
      </div>
    </div>
  )
}

export default React.memo(ToDo)
