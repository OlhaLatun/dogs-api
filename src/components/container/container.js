import React , { Component } from 'react'
import './Container.scss'
import SearchPanel from '../SearchPanel'
import LikeDislikeNavigation from '../LikeDislikeNavigation'
import BreedsFilter from '../BreedsFilter'
import BreedsGrid from '../BreedsGrid'

const HomePage = () => {
    return (
        <div className='home-page'>
        <div className='home-page-bg'></div>
     </div>
    )
}

export default class Container extends Component {

    render() {
    
        switch (this.props.route) {
            case 'breeds':
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
            case 'voting':
                return (
                    <h1>VOTING</h1>
                )
            case 'gallery':
                return (
                    <h1>GALLERY</h1>
                )
            default:   
             return (
                <div className='mutable'>  
                    <HomePage />
                </div>
            )
        }
    }
}


