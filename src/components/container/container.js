import React , { Component }from 'react'
import '../container/container.scss'
import SearchPanel from '../search-panel/search-panel'
import LikeDislikeNavigation from '../like-dislike-navigation/like-dislike-navigation'
import BreedsFilter from '../breeds-filter/breeds-filter'
import BreedsGrid from '../breeds-grid/breeds-grid'

const HomePage = () => {
    return (
        <div className='home-page'>
        <div className='home-page-bg'></div>
     </div>
    )
}

export default class Container extends Component {
    render() {
        return (
            <div className='mutable'>
                <div className='row'>
                    <SearchPanel />
                    <LikeDislikeNavigation />
                </div>
                <div className='row container'>
                <BreedsFilter />
                <BreedsGrid /> 
                </div>
              </div>
        )
    }
}