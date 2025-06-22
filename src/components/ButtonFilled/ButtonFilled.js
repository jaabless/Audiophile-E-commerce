import React from 'react'
import "./buttonFilled.scss"
import { Link } from 'react-router-dom'

export default function ButtonFilled({props}) {

  return (
    <Link to={{pathname: `/${props.category}/products/${props.name}`}} state={props}>
      <button className='buttonFilled'>
        SEE PRODUCT
      </button>
    </Link>
  )
}
