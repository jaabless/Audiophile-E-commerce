import './styles/_app.scss';
import {Routes, Route} from 'react-router-dom'
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Headphones from './pages/Headphones/Headphones';
import Speakers from './pages/Speakers/Speakers';
import Earphones from './pages/Earphones/Earphones';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Products from './pages/Products/Products';
import Checkout from './pages/Checkout/Checkout';
import Error from './pages/Error/Error';

function App() {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")
  const [cart, updateCart] = useState(cartFromLocalStorage)

  return (
    <div className="App">
      <ScrollToTop />
      <Navbar cart={cart} updateCart={updateCart}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/headphones" element={<Headphones />}/>
        <Route path="/speakers" element={<Speakers />}/>
        <Route path="/earphones" element={<Earphones />}/>
        <Route path=":slug/products/:slug" element={<Products cart={cart} updateCart={updateCart} />}/>
        <Route path="/checkout" element={<Checkout />}/>
        <Route path="*" element={<Error />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
