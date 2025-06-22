import React from 'react'
import './cardProduct.scss'
import ButtonFilled from '../ButtonFilled/ButtonFilled'
import { useLocation } from 'react-router-dom'

export default function CardProduct({props, id}) {

    const location = useLocation()
    props.previousPath = location.pathname
 
  return (
    <div className={location.pathname === "/speakers" ? "card-speaker" : "card"} id={id}>
        <picture className="card__picture">
            <source media="(max-width: 480px)" srcSet={props.categoryImage.mobile} />
            <source media="(max-width: 768px)" srcSet={props.categoryImage.tablet} />
            <img src={props.categoryImage.desktop} alt={props.name} />
        </picture>

        <div className="card-description-container">
            {props.new &&
                <p className="new-product">NEW PRODUCT</p>
            }
            <div className="card-description-content">
                <h3 className="card-title">{props.name}</h3>
                <p className="card-description">{props.description}</p>
                <ButtonFilled props={props}/>
            </div>
        </div>
    </div>
  )
}
