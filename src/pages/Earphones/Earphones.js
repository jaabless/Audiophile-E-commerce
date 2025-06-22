import React, {useEffect} from 'react'
import './earphones.scss'
import data from '../../data.json'
import CardProduct from '../../components/CardProduct/CardProduct'
import Products from '../../components/ProductSection/ProductSection'
import Branding from '../../components/Branding/Branding'

export default function Earphones() {

  useEffect(() => {
    document.title = "Audiophile - Earphones"
  }, [])

  const earphonesArray = data.filter((earphone) => {
    return earphone.category === "earphones"
  })

  return (
    <div className='page-main-container'>

    <div className="page-banner-container">
      <h1 className='page-title'>EARPHONES</h1>
    </div>

    <div className="page-product-container">

      <div className="page-product-content">
        {earphonesArray.map((earphone, index) => (
          <CardProduct props={earphone} key={index} id={index}/>
          ))}
      </div>
    
      <Products />

      <Branding />

    </div>
  </div>
  )
}
