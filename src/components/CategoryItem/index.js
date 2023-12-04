import './index.css'

const CategoryItem = props => {
  const {item, updateCategoryItem} = props
  const {categoryId, isActive} = item
  const className = isActive ? 'applyColor' : ''

  const changeCategory = () => {
    updateCategoryItem(categoryId)
  }

  return (
    <li className="category-item" onClick={changeCategory}>
      <button className={`category-button ${className}`} type="button">
        {item.name}
      </button>
    </li>
  )
}

export default CategoryItem
