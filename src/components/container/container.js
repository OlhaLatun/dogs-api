import React , { Component }from 'react'
import '../container/container.scss'
import SearchPanel from '../search-panel/search-panel'
import LikeDislikeNavigation from '../like-dislike-navigation/like-dislike-navigation'
import BreedsFilter from '../breeds-filter/breeds-filter'
import BreedsGrid from '../breeds-grid/breeds-grid'
import DogService from '../dog-service/dog-service'

const HomePage = () => {
    return (
        <div className='home-page'>
        <div className='home-page-bg'></div>
     </div>
    )
}

export default class Container extends Component {

    dogService = new DogService()

    state = {
        dogs: null
    }

    componentDidMount() {
    this.dogService.getAllDogs()
    .then(data => this.setState({dogs: data}))
    }

    render() {

        if (this.props.route === 'breeds') {
           return (
                <div className='mutable'>   
                    <div className='row'>
                        <SearchPanel />
                        <LikeDislikeNavigation />
                    </div>
                    <div className='row container'>
                        <BreedsFilter />
                        <BreedsGrid dogs={this.state.dogs} /> 
                     </div>
                </div>
           )
        } else if (this.props.route === 'voting') {
            return (
                <h1>VOTING</h1>
            )
        } else if (this.props.route === 'gallery') {
            return (
                <h1>GALLERY</h1>
            )
        }
        return (
            <div className='mutable'>  
                <HomePage />
            </div>
        )
    }
}


