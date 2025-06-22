import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import './error.scss'

export default function Error() {

  useEffect(() => {
    document.title = "Audiophile - 404 Error"
  }, [])

  return (
    <div className='error'>
        <div className="error-content">
            <h1>ERROR 404</h1>
            <p>It seems that the page you are looking for has not been found.</p>
            <Link to={'/'}>
                <button className='error-button'>BACK TO HOME PAGE</button>
            </Link>
        </div>
    </div>
  )
}
