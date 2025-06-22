import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './buttonTransparent.scss'

export default function ButtonTransparent({props}) {

  const location = useLocation()

  props.previousPath = location.pathname

  return (
    <Link to={{pathname: `${props.category}/products/${props.name}`}} state={props}>
      <button className='buttonTransparent'>
        SEE PRODUCT
      </button>
    </Link>
  )
}
