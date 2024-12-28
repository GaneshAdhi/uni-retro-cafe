import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartCount: () => {},
  deleteCartCount: () => {},
})

export default CartContext
