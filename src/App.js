import './App.css'

import {Component} from 'react'

import Home from './components/Home'

import CartContext from './context/CartContext'

class App extends Component {
  state = {cartList: []}

  onAddCartCount = item => {
    const {cartList} = this.state
    const isAlreadyExist = cartList.find(
      eachItem => eachItem.dishId === item.dishId,
    )
    if (!isAlreadyExist) {
      const newDish = {...item, quantity: 1}
      this.setState(prevState => ({cartList: [...prevState.cartList, newDish]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each =>
          each.dishId === item.dishId
            ? {...each, quantity: each.quantity + 1}
            : each,
        ),
      }))
    }
  }

  onDeleteCartCount = item => {
    const {cartList} = this.state
    const isAlreadyExist = cartList.find(each => item.dishId === each.dishId)
    if (isAlreadyExist) {
      this.setState(prevState => ({
        cartList: prevState.cartList
          .map(each =>
            item.dishId === each.dishId
              ? {...each, quantity: each.quantity - 1}
              : each,
          )
          .filter(each => each.quantity > 0),
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartCount: this.onAddCartCount,
          deleteCartCount: this.onDeleteCartCount,
        }}
      >
        <Home />
      </CartContext.Provider>
    )
  }
}

export default App
