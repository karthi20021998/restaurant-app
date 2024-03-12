import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {restaurantName, cartList} = useContext(CartContext)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/" className="nav-link">
        <h1 className="restaurant-name">{restaurantName}</h1>
      </Link>
      <div className="sub-card">
        <div className="cart-count-card">
          <p>My Orders</p>
          <Link to="/cart" className="nav-link">
            <button
              type="button"
              data-tesid="cart"
              className="cart-icon-button"
            >
              <AiOutlineShoppingCart className="cart-icon" />
            </button>
          </Link>
          <p className="cart-count-badge">
            {cartList.length > 0 ? cartList.length : ''}
          </p>
        </div>

        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
