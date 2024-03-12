import {useContext} from 'react'

import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const onClickRemoveAllButton = () => removeAllCartItems()

  const renderEmptyView = () => (
    <div className="empty-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty view"
        className="empty-view-image"
      />
      <p className="empty-description">Your cart is Empty.</p>
    </div>
  )

  const renderCartItems = () => (
    <>
      <div className="cart-container">
        <h1 className="cart-heading">Cart Items</h1>
        <button
          type="button"
          className="cart-button"
          onClick={onClickRemoveAllButton}
        >
          Remove All
        </button>
      </div>
      <ul className="cart-items-container">
        {cartList.map(eachCartItem => (
          <CartItem cartItemDetails={eachCartItem} key={eachCartItem.dishId} />
        ))}
      </ul>
    </>
  )

  return (
    <div>
      <Header />
      {cartList.length === 0 ? renderEmptyView() : renderCartItems()}
    </div>
  )
}

export default Cart
