import React, {useEffect} from 'react'
import './speakers.scss'
import data from '../../data.json'
import CardProduct from '../../components/CardProduct/CardProduct'
import Products from '../../components/ProductSection/ProductSection'
import Branding from '../../components/Branding/Branding'

export default function Speakers() {

  useEffect(() => {
    document.title = "Audiophile - Speakers"
  }, [])

  const speakersArray = data.filter((speaker) => {
    return speaker.category === "speakers"
  })

  return (
    <div className='page-main-container'>

      <div className="page-banner-container">
        <h1 className='page-title'>SPEAKERS</h1>
      </div>

      <div className="page-product-container">

        <div className="page-product-content">
          {speakersArray.map((speaker, index) => (
            <CardProduct props={speaker} key={index} id={index}/>
            ))}
        </div>
      
        <Products />

        <Branding />

      </div>
    </div>
  )
}
