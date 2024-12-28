import './index.css'

import {IoCartOutline} from 'react-icons/io5'

import CartContext from '../../context/CartContext'

const Header = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const getCartCount = () =>
        cartList.reduce((acc, item) => acc + item.quantity, 0)

      return (
        <div className="header-main-container">
          <h1 className="header-heading">UNI Resto Cafe</h1>
          <div className="order-button-card">
            <p className="larger-myorder-para">My Orders</p>
            <button className="button-item" type="button">
              <IoCartOutline size={30} />
              <p className="cart-count">{getCartCount()}</p>
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default Header
