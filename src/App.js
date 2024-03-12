import {Switch, Route} from 'react-router-dom'
import {useState} from 'react'

import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'
import './App.css'

const App = () => {
  const [restaurantName, setRestaurantName] = useState('')
  const [cartList, setCartList] = useState([])

  const addCartItem = dish => {
    const dishAlreadyExists = cartList.find(item => item.dishId === dish.dishId)

    if (dishAlreadyExists) {
      setCartList(prevState =>
        prevState.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + dish.quantity}
            : {...item},
        ),
      )
    } else {
      setCartList(prevState => [...prevState, dish])
    }
  }

  const removeCartItem = dishId => {
    const filteredResults = cartList.filter(
      eachItem => eachItem.dishId !== dishId,
    )
    setCartList(filteredResults)
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const incrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    const dishAlreadyExists = cartList.find(item => item.dishId === dishId)
    if (dishAlreadyExists.quantity > 1) {
      setCartList(prevState =>
        prevState.map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        ),
      )
    } else {
      removeCartItem(dishId)
    }
  }

  return (
    <CartContext.Provider
      value={{
        restaurantName,
        setRestaurantName,
        cartList,
        addCartItem,
        removeCartItem,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
      </Switch>
    </CartContext.Provider>
  )
}
export default App
