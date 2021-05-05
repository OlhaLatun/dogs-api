import React , { Component } from 'react'
import './Container.scss'
import SearchPanel from '../SearchPanel'
import LikeDislikeNavigation from '../LikeDislikeNavigation'
import BreedsFilter from '../BreedsFilter'
import BreedsGrid from '../BreedsGrid'
import DogService from '../../api/dog-service'

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
        dogs: [],
        selectedBreed: 'all breeds',
        limit: '20',
        order: 'ascen'
    }

    componentDidMount() {
        this.dogService.getAllDogs()
        .then(dogs => this.setState({dogs}))
        .catch(err => console.log(err))
        }

   ascen = (order) => {
       this.setState({order})
    }

    descen = (order) => {
        this.setState({order})
    }

    selectedBreed = (selectedBreed) => {
        this.setState({selectedBreed})
    }

    setLimit = (limit) => {
        this.setState({limit})
    }

    render() {
        const { dogs, order, limit, selectedBreed } = this.state
      
        switch (this.props.route) {
            case 'breeds':
                return (
                    <div className='mutable'>   
                        <div className='row'>
                            <SearchPanel />
                            <LikeDislikeNavigation />
                        </div>
                        <div className='row container'>
                            <BreedsFilter dogs={dogs} 
                            onClickAscen={this.ascen} 
                            onClickDescen={this.descen}
                            onBreedSelected={this.selectedBreed}
                            onLimit={this.setLimit}/>
                            <BreedsGrid order={order} limit={limit} selectedBreed={selectedBreed} /> 
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


