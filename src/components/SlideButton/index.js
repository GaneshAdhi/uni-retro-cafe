import './index.css'

const SlideButton = props => {
  const {slideButtonDetails, isActiveStatus, onActiveMenu} = props
  const {menuCategory, menuCategoryId} = slideButtonDetails
  const buttonColor = isActiveStatus ? 'button-active' : 'button-slide'

  const onActiveIdClick = () => {
    onActiveMenu(menuCategoryId)
  }

  return (
    <li className="list-slide-item">
      <button type="button" onClick={onActiveIdClick} className={buttonColor}>
        {menuCategory}
      </button>
      {isActiveStatus && <hr className="sperater-active" />}
    </li>
  )
}

export default SlideButton
