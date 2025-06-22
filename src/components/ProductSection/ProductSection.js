import React from 'react'
import { Link } from 'react-router-dom'
import './productSection.scss'

export default function Products() {
  return (
    <section className='section-products'>
        
        <div className='product__section'>
            <Link className="product__section__layout" to={'/headphones'}>

                <picture className='product__section__picture'>
                    <img src="/starter-code/assets/shared/desktop/image-category-thumbnail-headphones.png" alt="" />
                </picture>

                <div className="product__section__content">
                    <p className='product__section__title'>HEADPHONES</p>
                    <div className="product__section__shop">
                        <p>SHOP</p>
                        <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5" stroke="#D87D4A" strokeWidth="2" fill="none"/></svg>
                    </div>
                </div>
                
            </Link>
            <Link className="product__section__layout" to={'/speakers'}>

                <picture className='product__section__picture'>
                    <img src="/starter-code/assets/shared/desktop/image-category-thumbnail-speakers.png" alt="" />
                </picture>

                <div className="product__section__content">
                    <p className='product__section__title'>SPEAKERS</p>
                    <div className="product__section__shop">
                        <p>SHOP</p>
                        <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5" stroke="#D87D4A" strokeWidth="2" fill="none"/></svg>
                    </div>
                </div>
                
            </Link>

            <Link className="product__section__layout" to={'/earphones'}>

                <picture className='product__section__picture'>
                    <img src="/starter-code/assets/shared/desktop/image-category-thumbnail-earphones.png" alt="" />
                </picture>

                <div className="product__section__content">
                    <p className='product__section__title'>EARPHONES</p>
                    <div className="product__section__shop">
                        <p>SHOP</p>
                        <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5" stroke="#D87D4A" strokeWidth="2" fill="none"/></svg>
                    </div>
                </div>
                
            </Link>

        </div>

    </section>
  )
}
