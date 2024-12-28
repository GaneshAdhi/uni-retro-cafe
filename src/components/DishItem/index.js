import './index.css'

import CartContext from '../../context/CartContext'

const DishItem = props => {
  const {dishDetail} = props

  const {
    addonCat,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    dishType,
    dishId,
  } = dishDetail

  const borderColor = dishType === 2 ? 'symbol-veg-card' : 'symbol-non-veg-card'

  const dotColor = dishType === 2 ? 'dot-veg' : 'dot-non-veg'

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartCount, deleteCartCount, cartList} = value

        const onAddClick = () => {
          addCartCount(dishDetail)
        }

        const onMinusClick = () => {
          deleteCartCount(dishDetail)
        }

        const getQuantity = () => {
          const cartItem = cartList.find(each => each.dishId === dishId)
          return cartItem ? cartItem.quantity : 0
        }

        return (
          <li className="dish-item-card">
            <div className="card-first">
              <div className="symbol-dish-title">
                <div className={borderColor}>
                  <p className={dotColor}>o</p>
                </div>
                <div className="symbol-description-card">
                  <p className="dish-name">{dishName}</p>
                  <p className="currency">
                    {dishCurrency} {dishPrice}
                  </p>
                  <p className="description">{dishDescription}</p>
                  {dishAvailability ? (
                    <>
                      <div className="button-card">
                        <button
                          onClick={onMinusClick}
                          type="button"
                          className="button-style"
                          disabled={getQuantity() === 0}
                        >
                          -
                        </button>

                        <p className="item-count">{getQuantity()}</p>
                        <button
                          onClick={onAddClick}
                          type="button"
                          className="button-style"
                        >
                          +
                        </button>
                      </div>
                      <div>
                        {addonCat.length > 0 && (
                          <p className="customization">
                            Customizations available
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="not-available">Not available</p>
                  )}
                </div>
              </div>
            </div>
            <p className="calories">{dishCalories} calories</p>
            <img className="dish-img" src={dishImage} alt={dishName} />
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItem
