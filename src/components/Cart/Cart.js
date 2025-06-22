import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './cart.scss'

export default function Cart({cart, cartActive, setCartActive}) {

    const updateCart = cart.updateCart
    const [cartItem, setCartItem] = useState([])
    const [formattedPrice, setFormattedPrice] = useState([])
    
    // Filtre les projets si le compteur et égal ou supérieur à 1
    useEffect(() => {
        setCartItem(cartItem =>
            cart.cart.filter((item) => item.counter >= 1)
        )
    }, [cart])
    
    // Sauvegarde le panier dans le localStorage à chaque rendu de cartItem
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItem))
    }, [cartItem])

    useEffect(() => {
        if(cartActive) {
            document.body.style.overflow = 'hidden';
        }
    })
        
    // Gestion du prix total du panier
    const price = cartItem.map((item) => {
        let itemPrice = item.price * item.counter

        return itemPrice
    })
    
    const total = price.reduce(
        (acc, product) => acc + product, 0
    )

    // Gestion du nombre total d'article dans le panier
    const totalProduct = cartItem.map((item) => (
        item.counter 
    ))

    const sumCount = totalProduct.reduce(
        (acc, product) => acc + product, 0
    )

    // Gestion du state du produit lorsque l'utilisateur décrémente
    function handleMinus(name, counter) {
        updateCart(cart =>
            cart.map((item) =>
                name === item.name ? {...item, counter: item.counter - 1} : item
            ),
        )      
    }

    // Gestion du state du produit lorsque l'utilisateur incrémente
    function handlePlus(name) {
        updateCart(cart =>
            cart.map((item) => 
                name === item.name ? {...item, counter: item.counter + 1} : item
            ),  
        ) 
    }

    const handleRemove = () => {
        updateCart([])
        localStorage.removeItem("cart")
    }
    
    // Gère la fermeture de la modale cart au click sur l'overlay
    const cartRef = useRef()

    function checkClickOutsideCart(e) {
        if(cartActive && cartRef.current?.contains(e.target || e.target.className === "cart-container empty")) {
          setCartActive(false)
          document.body.style.overflow = 'inherit';
        }
    }
    
    useEffect(() => {
        document.addEventListener('mousedown', checkClickOutsideCart)
    })

        // Modification de l'affichage du prix
        useEffect(() => {       
            let currentPrice = total.toString()
            if(currentPrice > 999) {
                const newPrice = `${currentPrice.slice(0, 1)}${','}${currentPrice.slice(1)}`
                setFormattedPrice(newPrice)
            } else if (currentPrice < 1000) {
                setFormattedPrice(total)
            }
        }, [total])

  return (
    <div className='cart'>

        <div ref={cartRef} className="cart__overlay"></div>
        <div className="cart-global">
            <div className={ total !== 0 && sumCount !== 0 ? "cart-container" : "cart-container empty"}>

                {total !== 0 && sumCount !== 0 ?
                    <>
                        <div className="cart-container__top">
                            <p className="cart-container__title">CART ({sumCount})</p>
                            <button className='cart-container__remove' onClick={handleRemove}>Remove all</button>
                        </div>

                            <div className="cart-list">

                            {cartItem.map((item, index) => (
                                <div key={index} className="cart-products">
                                    <Link to={{pathname: `/${item.category}/products/${item.name}`}} state={item}>
                                        <div key={index} className="cart-products__item">
                                            <img src={item.image} alt={item.name} />
                                            <div className="cart-products__content">
                                                <p className="cart-products__content__title">{item.subName}</p>
                                                <p className="cart-products__content__price">$ {item.formattedPrice}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="counter-cart">
                                        <button className='counter-cart__minus' onClick={() => handleMinus(item.name, item.counter)} disabled={item.counter === 0}> - </button>
                                            <p>{item.counter}</p>
                                        <button className='counter-cart__plus' onClick={() => handlePlus(item.name)}> + </button>
                                    </div>
                                </div>
                            ))}
                            </div>
                        {total &&
                            <>
                                <div className="cart-total">
                                    <p className="cart-total__text">TOTAL</p>
                                    <p className="cart-total__count">$ {formattedPrice}</p>
                                </div>
                                <Link className='cart-button-link' to={ '/checkout' } state={formattedPrice} >
                                    <button className='cart-button'>CHECKOUT</button>
                                </Link>
                            </>
                        }
                    </>
                :
                    <div className="empty-container">
                        <p className="empty-container__text">
                            <span>Oops...</span>
                            <br></br>
                            Your cart is empty
                         </p>
                        <svg className="empty-container__svg" width="23" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z" fill="#000"/></svg>
                    </div>
                }
            </div>
        </div>
        
    </div>
  )
}
