import React, { useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import data from '../../data.json'
import './products.scss'
import ButtonFilled from '../../components/ButtonFilled/ButtonFilled'
import ProductSection from '../../components/ProductSection/ProductSection'
import Branding from '../../components/Branding/Branding'


export default function Products({updateCart, cart}) {

    const location = useLocation()
    const navigate = useNavigate()

    // Filtre du produit en fonction de l'url
    const products = data.filter((product) => (
        product.slug === location.state.slug
    ))

    useEffect(() => {
        document.title = `Audiophile - ${products[0].subName} `
      }, [products])

    // Gére le retour à la page précédente
    const handleGoBack = () => {
        navigate(-1)
    }
  
    const [formattedPrice, setFormattedPrice] = useState([])
    const [counter, setCounter] = useState(1)

    // Modification de l'affichage du prix
    useEffect(() => {       
        let currentPrice = products[0].price.toString()
        if(currentPrice > 999) {
            const newPrice = `${currentPrice.slice(0, 1)}${','}${currentPrice.slice(1)}`
            setFormattedPrice(newPrice)
        } else if (currentPrice < 1000) {
            setFormattedPrice(products[0].price)
        }
    }, [products])
    
    // Gestion de l'état du compteur
    const handleCounterPlus = () => {
        setCounter( counter + 1)
    }

    const handleCounterMinus = () => {
        setCounter( counter - 1)
    }

    // Gère l'état du panier
    function handleCart(name, price, image, slug, category, subName) {
        // Si notre cart contient déja le nom du produit alors on lui ajoute le nouveau compteur
        const currentProduct = cart.find((product) => product.name === name)
        if (currentProduct) {
            const filteredCurrentProduct = cart.filter(
                (product) => product.name !== name
            )
            updateCart([
                ...filteredCurrentProduct,
                {name, price, image, slug, category, subName, counter: currentProduct.counter + counter, formattedPrice: formattedPrice}
            ])
        // Sinon, on ajoute toutes les infos du produit    
        } else {
            updateCart([...cart, {counter, name, price, image, slug, category, subName, formattedPrice: formattedPrice}])
        }
    }

    // Sauvegarde le panier dans le local storage dés qu"il y a un changement dans 'cart' et remet les compteurs à zéro
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart)) 
        setCounter(1)
        if(!location.pathname) {
            setCounter(1)
        }     
    }, [cart, location])

  return (
    <div className='products'>

        <div className="go-back-button">
            <button onClick={handleGoBack}>
                Go Back
            </button>
        </div>

        {products.map((product, index) => (
            <div key={index} className="product-container">

                <div className="item__product">
                    <picture className="item__product__picture">
                        <source media="(max-width: 480px)" srcSet={product.image.mobile} />
                        <source media="(max-width: 768px)" srcSet={product.image.tablet} />
                        <img src={product.image.desktop} alt={product.name} />
                    </picture>

                    <div className="item-description-container">
                        {product.new &&
                            <p className="new">NEW PRODUCT</p>
                        }
                        <div className="item-description-content">
                            <h3 className="item-title">{product.name}</h3>
                            <p className="item-description">{product.description}</p>

                            <p className="price">$ {formattedPrice}</p>

                            <div className="add-cart-container">
                                <div className="counter">
                                    <button className='counter__minus' onClick={handleCounterMinus} disabled={counter === 1}> - </button>
                                    <p>{counter}</p>
                                    <button className='counter__plus' onClick={handleCounterPlus}> + </button>
                                </div>

                                <button className="add-cart-button" onClick={() => handleCart(product.name, product.price, product.image.desktop, product.slug, product.category, product.subName)}>
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="card-product-content">
                    
                    <div className="features">
                        <h5 className='features__title'>FEATURES</h5>
                        <p className='features__text'>{product.features}</p>
                    </div>

                    <div className="inside">
                        <h5 className='inside__title'>IN THE BOX</h5>
                        <ul className='inside__include'>
                            {product.includes.map((items, index) => (
                                <li key={index} className='inside__list'>
                                    <span className="inside__list__quantity">{items.quantity}x</span>
                                    <span className="inside__list__item">{items.item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="gallery">
                    <div className="gallery__left">
                        <picture className="gallery__top">
                            <img src={product.gallery.first.desktop} alt="" />
                        </picture>
                        <picture className="gallery__bottom">
                            <img src={product.gallery.second.desktop} alt="" />
                        </picture>
                    </div>
                    <div className="gallery__right">
                        <picture className="gallery__picture">
                            <img src={product.gallery.third.desktop} alt="" />
                        </picture>
                    </div>
                </div>

                <div className="also-like">

                    <h5 className='also-like__title'>YOU MAY ALSO LIKE</h5>
                    <div className="also-like__content">

                        {product.others.map((item, index) => (                     
                            <div key={index} className="also-like__card">
                                <picture>
                                    <source media="(max-width: 480px)" srcSet={item.image.mobile} />
                                    <source media="(max-width: 768px)" srcSet={item.image.tablet} />
                                    <img src={item.image.desktop} alt={item.name} />
                                </picture>
                                <h5 className='also-like__text'>{item.name}</h5>
                                <ButtonFilled props={item}/>
                            </div>
                        ))}
                    </div>
                </div>

                <ProductSection />
                <Branding />

            </div>
        ))}
        
    </div>
  )
}
