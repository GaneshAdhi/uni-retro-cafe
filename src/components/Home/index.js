import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SlideButton from '../SlideButton'
import DishItem from '../DishItem'

class Home extends Component {
  state = {
    tableMenuList: [],
    isActiveCategoryId: '',
    isLoader: true,
  }

  componentDidMount() {
    this.getTableMenuList()
  }

  getTableMenuList = async () => {
    const menuListApi = `https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details`
    const option = {method: 'GET'}
    try {
      const response = await fetch(menuListApi, option)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const getmenuData = await response.json()
      const tableMenuList = getmenuData[0].table_menu_list

      const snakeToCamelCaseCovertCategoryDish = eachItem => ({
        addonCat: eachItem.addonCat,
        dishId: eachItem.dish_id,
        dishAvailability: eachItem.dish_Availability,
        dishType: eachItem.dish_Type,
        dishCalories: eachItem.dish_calories,
        dishCurrency: eachItem.dish_currency,
        dishDescription: eachItem.dish_description,
        dishImage: eachItem.dish_image,
        dishName: eachItem.dish_name,
        dishPrice: eachItem.dish_price,
      })

      const snakeTocamelCaseConvertData = each => ({
        categoryDishes: each.category_dishes.map(eachDishItem =>
          snakeToCamelCaseCovertCategoryDish(eachDishItem),
        ),
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        menuCategoryImage: each.menu_category_image,
      })

      const updateData = tableMenuList.map(eachDishMenu =>
        snakeTocamelCaseConvertData(eachDishMenu),
      )

      this.setState({
        tableMenuList: updateData,
        isActiveCategoryId: updateData[0]?.menuCategoryId || '',
        isLoader: false,
      })
    } catch (error) {
      console.error(error.message)
      this.setState({isLoader: false})
    }
  }

  onActiveClick = id => {
    this.setState({isActiveCategoryId: id})
  }

  getFilterData = tableMenuList => {
    const {isActiveCategoryId} = this.state

    return tableMenuList.filter(
      eachItem => eachItem.menuCategoryId === isActiveCategoryId,
    )
  }

  render() {
    const {isLoader, tableMenuList, isActiveCategoryId} = this.state

    const filterData = this.getFilterData(tableMenuList)

    return (
      <>
        {isLoader ? (
          <div className="loader-container">
            <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
          </div>
        ) : (
          <div className="main-container">
            <Header />
            <hr className="sperater-content" />

            <ul className="slide-button-container">
              {tableMenuList.map(eachButton => (
                <SlideButton
                  onActiveMenu={this.onActiveClick}
                  isActiveStatus={
                    isActiveCategoryId === eachButton.menuCategoryId
                  }
                  key={eachButton.menuCategoryId}
                  slideButtonDetails={eachButton}
                />
              ))}
            </ul>
            <ul className="dish-container">
              {filterData[0]?.categoryDishes.map(eachItem => (
                <DishItem key={eachItem.dishId} dishDetail={eachItem} />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default Home
