import './index.css'
import {useState, useContext} from 'react'
import CartContext from '../../context/CartContext'

const DishDetails = props => {
  const {dishDetails} = props
  const {
    dishCalories,
    dishCurrency,
    dishDescription,
    dishImage,
    dishName,
    dishPrice,
    dishAvailability,
    dishType,
    addonCat,
  } = dishDetails

  const [quantity, setQuantity] = useState(0)
  const {addCartItem} = useContext(CartContext)

  const onIncreaseQuantity = () => {
    setQuantity(prevState => prevState + 1)
  }

  const onDecreaseQuantity = () => {
    setQuantity(prevState => (prevState > 0 ? prevState - 1 : 0))
  }

  const onClickAddToCart = () => {
    addCartItem({...dishDetails, quantity})
  }

  const renderNotAvailable = () => (
    <h1 className="not-available">Not Available</h1>
  )

  const renderButton = () => (
    <div className="dish-button-card">
      <button
        type="button"
        className="dish-button"
        onClick={onDecreaseQuantity}
      >
        -
      </button>
      <p>{quantity}</p>
      <button
        type="button"
        className="dish-button"
        onClick={onIncreaseQuantity}
      >
        +
      </button>
    </div>
  )

  const renderText = () => (
    <h1 className="custom-text">Customizations Available</h1>
  )

  return (
    <li className="eachdish-list">
      <div className={`veg-border ${dishType === 1 ? 'non-veg-border' : ''}`}>
        <div className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`} />
      </div>
      <div className="dishdetails-container">
        <div>
          <h1 className="dish-name">{dishName}</h1>
          <p className="dish-price">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dish-description">{dishDescription}</p>
          <p>
            {dishAvailability === true ? renderButton() : renderNotAvailable()}
          </p>
          {addonCat.length !== 0 ? renderText() : ''}
          {quantity > 0 && (
            <button
              type="button"
              className="addtocart-btn"
              onClick={onClickAddToCart}
            >
              ADD TO CART
            </button>
          )}
        </div>

        <h1 className="dish-cals">{dishCalories} calories</h1>
        <img src={dishImage} alt="menuimage" className="dish-image" />
      </div>
    </li>
  )
}

export default DishDetails
