import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api'

import Placeholder from './Placeholder'

const ListCategories = () => {
  const [isLoadingCategoryes, setLoadingCategoryes] = useState(false)
  const [listCategoryes, setCategoryes] = useState([])

  // Loading categories at start
  useEffect(() => {
    console.log('Loading categoryes...')
    setLoadingCategoryes(true)
    api.loadCategories()
      .then(result => {
        setCategoryes(result)
        setLoadingCategoryes(false)
      })
  }, [])

  const list = listCategoryes.map((category, index) => {
    return (
      <div
        key={index}
        className='text-center m-px bg-indigo-50 hover:bg-gray-50'>
        <Link to={`/${category}`}>{category}</Link>
      </div>
    )
  })

  return (<div>
    {!isLoadingCategoryes ? list : Placeholder()}
  </div>
  )
}
export default ListCategories
