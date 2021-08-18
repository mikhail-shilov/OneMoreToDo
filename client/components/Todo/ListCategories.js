import React from 'react'
import { Link } from 'react-router-dom'

const ListCategories = (props) => {

  const list = props.categories.map((category, index) => {
    return (
      <div
        key={index}
        className='text-center m-px bg-indigo-50 hover:bg-gray-50'>
        <Link to={`/${category}`}>{category}</Link>
      </div>
    )
  })

  return (
    <div>
      {list}
    </div>

  )
}

export default ListCategories
