import React, {useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import './home.scss'
import ButtonFilled from '../../components/ButtonFilled/ButtonFilled';
import ButtonTransparent from '../../components/ButtonTransparent/ButtonTransparent';
import Products from '../../components/ProductSection/ProductSection';
import Branding from '../../components/Branding/Branding';
import data from '../../data.json'

export default function Home() {

  useEffect(() => {
    document.title = "Audiophile"
  }, [])

  const location = useLocation()

  const newData = data.map((product) => {
    product.previousPath = location.pathname

    return product
  })

  const xx99Headphones = newData.filter((product) => (
    product.name === "XX99 Mark II Headphones"
  ))

  const zx9Speakers = newData.filter((product) => (
    product.name === "ZX9 Speaker"
  ))

  const zx7Speakers = newData.filter((product) => (
    product.name === "ZX7 Speaker"
  ))

  const yx1Earphones = newData.filter((product) => (
    product.name === "YX1 Wireless Earphones"
  ))
  
  return (
    <>
      <header className='home-header'>

        {xx99Headphones.map((product, index) => (         
          <div key={index} className="hero-container">
            <div className="hero-content">
              <p className='hero-title'>NEW PRODUCT</p>
              <h1 className='hero-product'>{product.name}</h1>
              <p className='hero-description'>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusisast.</p>             
                <ButtonFilled props={product}/>
            </div>
          </div>
        ))}

        <picture className='hero-picture'>
          <source media="(max-width: 480px)" srcSet={'/starter-code/assets/home/mobile/image-header.jpg'} />
          <source media="(max-width: 1024px)" srcSet={'/starter-code/assets/home/tablet/image-header.jpg'} />
          <img src='/starter-code/assets/home/desktop/image-hero.jpg' alt="mark-two headphones" />
        </picture>

      </header>

      <main>
          <Products />

          <section className='products-section'>
            <div className="main-product">

              <div className="product-main-container">
                <picture className='product-main-picture'>
                  <source media="(max-width: 480px)" srcSet={'/starter-code/assets/home/mobile/image-speaker-zx9.png'} />
                  <source media="(max-width: 1024px)" srcSet={'/starter-code/assets/home/tablet/image-speaker-zx9.png'} />
                  <img src="/starter-code/assets/home/desktop/image-speaker-zx9.png" alt="speaker-zx9" />
                </picture>
                  
                <div className="product-main-content">
                  {zx9Speakers.map((product, index) => (
                    <div key={index} className="product-content">
                      <p className='product-title-main'>{product.name}</p>
                      <p className='product-description-main'>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
                      <Link to={{pathname: `${product.category}/products/${product.name}`}} state={product}>
                        <button className='button-speaker-main'>
                          SEE PRODUCT
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>

              </div>

            </div>

            <div className="secondary-product">
              <div className="secondary-product-container">

                {zx7Speakers.map((product, index) => (
                  <div key={index} className="secondary-product-content">
                    <p className='product-title-secondary'>{product.name}</p>
                      <ButtonTransparent props={product} />
                    </div>
                ))}

              </div>
            </div>

            <div className="third-product">

              <div className="third-product-picture">
                <picture>
                  <source media="(max-width: 480px)" srcSet={'/starter-code/assets/home/mobile/image-earphones-yx1.jpg'} />
                  <source media="(max-width: 768px)" srcSet={'/starter-code/assets/home/tablet/image-earphones-yx1.jpg'} />
                  <img src={'/starter-code/assets/home/desktop/image-earphones-yx1.jpg'} alt="" />
                </picture>
              </div>

              <div className="third-product-content-container">

                {yx1Earphones.map((product, index) => (
                  <div key={index} className="third-product-content">
                    <p className='third-product-title'>YX1 EARPHONES</p>
                      <ButtonTransparent props={product}/>
                  </div>
                ))}
                
              </div>

            </div>          
          </section>
          <section className='branding-section'>
            <Branding />
          </section>
      </main>
    </>
  )
}
