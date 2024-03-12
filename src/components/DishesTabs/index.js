import './index.css'

const DishesTabs = props => {
  const {menuTabs, updateActiveTabId, isActive} = props
  const {menuCategory, menuId} = menuTabs

  const onClickTab = () => {
    updateActiveTabId(menuId)
  }

  const activeTabClassName = isActive ? 'active-tab-btn' : ''

  return (
    <div className="tab-dish-total-container">
      <li>
        <button
          type="button"
          className={`menu-button ${activeTabClassName}`}
          onClick={onClickTab}
        >
          {menuCategory}
        </button>
      </li>
    </div>
  )
}

export default DishesTabs
