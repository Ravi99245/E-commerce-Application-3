import {FaSearch} from 'react-icons/fa'

import './index.css'
import CategoryItem from '../CategoryItem'
import RatingItem from '../RatingItem'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    updateCategory,
    updateRating,
    updateTitleSearch,
    updateTitleInput,
    clearFilterItems,
    titleSearch,
  } = props

  const updateCategoryItem = id => {
    updateCategory(id)
  }
  const updateRatingItem = id => {
    updateRating(id)
  }

  const updateInput = event => {
    if (event.key === 'Enter') {
      updateTitleSearch(event.target.value)
    }
  }
  const changeInput = event => {
    updateTitleInput(event.target.value)
  }

  const clearFilters = () => {
    clearFilterItems()
  }

  return (
    <div className="filters-group-container">
      <div className="input-container">
        <input
          type="search"
          className="input-element"
          value={titleSearch}
          placeholder="Search"
          onChange={changeInput}
          onKeyPress={updateInput}
        />
        <FaSearch className="search-element" />
      </div>
      <div className="category-container">
        <h1 className="category-heading">Category</h1>
        <ul className="category-items">
          {categoryOptions.map(eachItem => (
            <CategoryItem
              key={eachItem.categoryId}
              item={eachItem}
              updateCategoryItem={updateCategoryItem}
            />
          ))}
        </ul>
      </div>
      <div className="rating1-container">
        <h1 className="category-heading">Rating</h1>
        <ul className="category-items">
          {ratingsList.map(eachItem => (
            <RatingItem
              key={eachItem.ratingId}
              item={eachItem}
              updateRatingItem={updateRatingItem}
            />
          ))}
        </ul>
      </div>
      <button className="clear-button" type="button" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  )
}
export default FiltersGroup
