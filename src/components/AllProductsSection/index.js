import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
    isActive: false,
  },
  {
    name: 'Electronics',
    categoryId: '2',
    isActive: false,
  },
  {
    name: 'Appliances',
    categoryId: '3',
    isActive: false,
  },
  {
    name: 'Grocery',
    categoryId: '4',
    isActive: false,
  },
  {
    name: 'Toys',
    categoryId: '5',
    isActive: false,
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusText = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class AllProductsSection extends Component {
  state = {
    apiStatus: apiStatusText.initial,
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    titleSearch: '',
    category: '',
    rating: '',
    categoryList: categoryOptions,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
      apiStatus: apiStatusText.loading,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, category, titleSearch, rating} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${titleSearch}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
        apiStatus: apiStatusText.success,
      })
    } else {
      this.setState({apiStatus: apiStatusText.failure, isLoading: false})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    if (productsList.length === 0) {
      return (
        <div className="no-products-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            className="no-products-image"
            alt="no products"
          />
          <h1 className="no-products-heading">No Products Found</h1>
          <p className="no-products-description">
            We could not found any products. Try other filters
          </p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  updateCategory = id => {
    this.setState(prevState => ({
      categoryList: prevState.categoryList.map(eachItem => {
        if (eachItem.categoryId === id) {
          return {...eachItem, isActive: true}
        }
        return {...eachItem, isActive: false}
      }),
    }))
    this.setState({category: id}, this.getProducts)
  }

  updateRating = id => {
    this.setState({rating: id}, this.getProducts)
  }

  updateTitleSearch = value => {
    this.setState({titleSearch: value}, this.getProducts)
  }

  updateTitleInput = value => {
    this.setState({titleSearch: value})
  }

  clearFilterItems = () => {
    this.setState(
      {
        rating: '',
        category: '',
        titleSearch: '',
        categoryList: categoryOptions,
      },
      this.getProducts,
    )
  }

  // TODO: Add failure view
  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png "
        className="no-products-image"
        alt="products failure"
      />
      <h1 className="no-products-heading ">Oops! Something Went Wrong</h1>
      <p className="no-products-description ">
        We are having some trouble processing your. <br />
        Please try again.
      </p>
    </div>
  )

  render() {
    let content
    const {apiStatus, categoryList, titleSearch, productsList} = this.state
    console.log(productsList.length)
    switch (apiStatus) {
      case apiStatusText.loading:
        content = this.renderLoader()
        break
      case apiStatusText.success:
        content = this.renderProductsList()
        break
      case apiStatusText.failure:
        content = this.renderFailureView()
        break
      default:
        content = null
        break
    }

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          titleSearch={titleSearch}
          categoryOptions={categoryList}
          ratingsList={ratingsList}
          updateCategory={this.updateCategory}
          updateRating={this.updateRating}
          updateTitleSearch={this.updateTitleSearch}
          clearFilterItems={this.clearFilterItems}
          updateTitleInput={this.updateTitleInput}
        />
        {content}
      </div>
    )
  }
}

export default AllProductsSection
