import './index.css'

const RatingItem = props => {
  const {item, updateRatingItem} = props
  const {ratingId} = item

  const changeRating = () => {
    updateRatingItem(ratingId)
  }

  return (
    <li className="rating-item" onClick={changeRating}>
      <img
        src={item.imageUrl}
        className="rating-image"
        alt={`rating ${item.ratingId}`}
      />
      <p>& up</p>
    </li>
  )
}

export default RatingItem
