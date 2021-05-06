import React, { Component } from 'react'
import { BackBtnIcon, LikeIcon, DislikeIcon, FavIcon } from '../Icons/Icons'
import Loader from '../Loader'
import DogService from '../../api/dog-service'
import '../Voting/Voting.scss'

export default class Voting extends Component {

    dogService = new DogService()

    state = {
        randomDog: [],
        favs: false,
        action: '',
        time: ''
    }

    componentDidMount() {
        this.randomDog()
    }

    randomDog() {
        this.dogService.getRandomDog()
            .then(randomDog => this.setState({ randomDog: randomDog[0] }))
            .catch(err => console.log(err))
    }

    getTime() {
        const date = new Date()
        return `${date.getHours()}:${date.getMinutes()}`
    }

    onLike = () => {
        const time = this.getTime()
        this.setState({ action: 'Likes', time: time })
        const content = {
            image_id: this.state.randomDog.id,
            value: 1
        }
        this.randomDog()
        this.dogService.sendVote(content)
            .catch(err => (console.log(err)))
    }

    onDislike = () => {
        const time = this.getTime()
        this.setState({ action: 'Dislikes', time: time })
        const content = {
            image_id: this.state.randomDog.id,
            value: 0
        }
        this.randomDog()
        this.dogService.sendVote(content)
            .catch(err => (console.log(err)))
    }

    onFavs = () => {
        const time = this.getTime()
        this.setState({ favs: !this.state.favs, action: 'Favourites', time: time })
        const content = {
            image_id: this.state.randomDog.id,
        }
        this.dogService.sendFavs(content)
            .catch(err => (console.log(err)))
    }

    render() {
        const { randomDog, favs, action, time } = this.state
        const classNames = favs ? 'icon vote-favs-active' : 'icon vote-favs'
        let icon = ''
        let logIconClass = ''

        switch (action) {
            case 'Likes':
                icon = <LikeIcon />
                logIconClass = 'log-icon-like'
                break;
            case 'Favourites':
                icon = <FavIcon />
                logIconClass = 'log-icon'
                break;
            case 'Dislikes':
                icon = <DislikeIcon />
                logIconClass = 'log-icon-dislike'
                break;
        }

        return (
            <div className='voting'>
                <span className='btn-back'><BackBtnIcon /></span>
                <span className='voting-label'>breeds</span>
                <div className='dog-to-vote'>
                    {randomDog ?
                        <React.Fragment>
                            <img src={randomDog.url} alt='random dog' />
                            <div className='voting-panel' >
                                <div className='icon vote-like' onClick={this.onLike}> <LikeIcon /> </div>
                                <div className={classNames} onClick={this.onFavs}> <FavIcon /></div>
                                <div className='icon vote-dislike' onClick={this.onDislike}> <DislikeIcon /></div>
                            </div>
                        </React.Fragment>
                        : <Loader />}
                </div>
                <div className='log-container'>
                    <div className='log'>
                        <span className='log-time'>{time}</span>
                        <span className='log-message'> Image ID: {randomDog.id} was added to {action} </span>
                        <span className={logIconClass}> {icon} </span>
                    </div>
                </div>
            </div>

        )
    }
}