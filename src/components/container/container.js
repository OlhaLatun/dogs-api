import React, { Component } from 'react'
import '../Container/Container.scss'
import SearchPanel from '../SearchPanel'
import LikeDislikeNavigation from '../LikeDislikeNavigation'
import BreedsFilter from '../BreedsFilter'
import { BreedsGrid } from '../BreedsGrid/BreedsGrid'
import Voting from '../Voting'
import DogService from '../../api/dog-service'
import BreedDetails from '../BreedDetails'

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
        selectedBreed: {},
        limit: '20',
        order: 'ASC',
        greedItemClicked: false,
        dogDetails: {},
        likeDislikeNav: ''
    }

    componentDidMount() {
        this.dogService.getAllDogs()
            .then(dogs => this.setState({ dogs }))
            .catch(err => console.log(err))
    }

    ascen = (order) => {
        this.setState({ order })
    }

    descen = (order) => {
        this.setState({ order })
    }

    selectedBreed = (name) => {
        let dog = this.state.dogs.find(dog => dog.name === name)
        if (dog) {
            this.setState({ selectedBreed: dog })
        } else {
            this.setState({ selectedBreed: false })
        }
    }

    setLimit = (limit) => {
        this.setState({ limit })
    }

    onGreedItemClick = (name) => {
        this.setState({ greedItemClicked: true })
        let dog = this.state.dogs.find(dog => dog.name === name)
        this.setState({ dogDetails: dog })
    }

    detailsBackBtnClicked = () => {
        this.setState({ greedItemClicked: false })
    }

    handleLikeDislikeNav = (str) => {
        this.setState({ likeDislikeNav: str })
    }

    render() {
        const { dogs, order, limit, selectedBreed, greedItemClicked, dogDetails } = this.state
        const breedsComponent = greedItemClicked ?
            <BreedDetails dog={dogDetails} backBtnClick={this.detailsBackBtnClicked} /> :
            <React.Fragment>
                <BreedsFilter dogs={dogs}
                    onClickAscen={this.ascen}
                    onClickDescen={this.descen}
                    onBreedSelected={this.selectedBreed}
                    onLimit={this.setLimit} />
                <BreedsGrid order={order} limit={limit} selectedBreed={selectedBreed} onClick={this.onGreedItemClick} />
            </React.Fragment>


        switch (this.props.route) {
            case 'breeds':
                return (
                    <div className='mutable'>
                        <div className='row'>
                            <SearchPanel />
                            <LikeDislikeNavigation />
                        </div>
                        <div className='row container'>
                            {breedsComponent}
                        </div>
                    </div>
                )
            case 'voting':
                return (
                    <div className='mutable'>
                        <div className='row'>
                            <SearchPanel />
                            <LikeDislikeNavigation onClick={this.handleLikeDislikeNav} />
                        </div>
                        <div className='row container'>
                            <Voting />
                        </div>
                    </div>
                )
            case 'gallery':
                return (
                    <h1>GALLERY in progress...</h1>
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


