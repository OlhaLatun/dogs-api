import React, { Component } from 'react'
import { BackBtnIcon, LikeIcon, DislikeIcon, FavIcon } from '../icons/icons'
import Loader from '../Loader'
import DogService from '../../api/dog-service'
import '../Voting/Voting.scss'

class Logs extends Component {

    state = {
        logs: []
    }

    componentDidUpdate(prevProps) {
        if (this.props.dogID !== prevProps.dogID) {
            this.setState({ logs: [...this.state.logs, prevProps] })
        }
    }

    render() {
        return (
            this.state.logs.map(log => {
                return (
                    <div className='log'>
                        <span className='log-time'>{log.time}</span>
                        <span className='log-message'> Image ID: {log.dogID} was {log.str} {log.action} </span>
                        <span className={log.iconClass}> {log.icon} </span>
                    </div>
                )
            })
        )
    }
}

export default class Voting extends Component {

    dogService = new DogService()

    state = {
        randomDog: [],
        myFavs: [],
        toggleFavs: false,
        action: '',
        time: '',
    }

    componentDidMount() {
        this.randomDog()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.myFavs !== prevState.myFavs) {
            this.handleFavs()
        }
    }

    handleFavs() {
        const content = {
            image_id: this.state.randomDog.id,
            sub_id: 'olha-user-93'
        }
        if (!this.state.toggleFavs) {
            let id = this.state.myFavs.find(fav => fav.image_id === this.state.randomDog.id).id
            this.dogService.removeFavs(id)
                .catch(err => console.log(err))
        } else {
            this.dogService.sendFavs(content)
                .catch(err => (console.log(err)))
        }
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
        this.setState({ action: 'Likes', time: time, toggleFavs: false })
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
        this.setState({ action: 'Dislikes', time: time, toggleFavs: false })
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
        this.dogService.getAllFavs()
            .then(favs => this.setState({ myFavs: favs }))
        this.setState({ toggleFavs: !this.state.toggleFavs, action: 'Favourites', time: time })
    }

    render() {
        const { randomDog, toggleFavs, action, time } = this.state
        const classNames = toggleFavs ? 'icon vote-favs-active' : 'icon vote-favs'
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
            default:
                break;
        }

        let str
        if (action !== 'Favourites') { str = 'added to' }
        else if (toggleFavs) {
            str = 'added to'
        } else {
            str = 'removed from'
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
                    {action !== '' ? <Logs action={action} time={time} str={str} dogID={randomDog.id} icon={icon} iconClass={logIconClass} /> : null}
                </div>
            </div>

        )
    }
}
