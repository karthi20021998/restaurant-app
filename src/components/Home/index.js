import {useState, useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import CartContext from '../../context/CartContext'
import DishesTabs from '../DishesTabs'
import DishDetails from '../DishDetails'
import Header from '../Header'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeTabId, setActiveTabId] = useState('')

  const {setRestaurantName} = useContext(CartContext)

  const getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuId: eachMenu.menu_category_id,
      menuImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  const fetchRestaurantApi = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const apiResponse = await fetch(url)
    const data = await apiResponse.json()
    const updatedData = getUpdatedData(data[0].table_menu_list)
    setResponse(updatedData)
    setRestaurantName(data[0].restaurant_name)
    setActiveTabId(updatedData[0].menuId)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchRestaurantApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateActiveTabId = menuId => setActiveTabId(menuId)

  const renderDishes = () => {
    const {categoryDishes} = response.find(
      eachCategory => eachCategory.menuId === activeTabId,
    )
    return (
      <ul>
        {categoryDishes.map(eachDish => (
          <DishDetails dishDetails={eachDish} key={eachDish.dishId} />
        ))}
      </ul>
    )
  }

  const renderLoader = () => (
    <div>
      <Loader type="ThreeDots" color="#0b69ff" heigth="50" width="50" />
    </div>
  )

  return isLoading ? (
    renderLoader()
  ) : (
    <div>
      <Header />
      <ul className="menu-card">
        {response.map(eachMenu => (
          <DishesTabs
            key={eachMenu.menuId}
            menuTabs={eachMenu}
            updateActiveTabId={updateActiveTabId}
            isActive={activeTabId === eachMenu.menuId}
          />
        ))}
      </ul>
      {renderDishes()}
    </div>
  )
}

export default Home
