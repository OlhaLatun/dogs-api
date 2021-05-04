import React , { Component} from 'react'
import DogService from '../../api/dog-service.js'
import './BreedsGrid.scss'
import Loader from '../Loader'

class Images extends Component {
    render() {
        return (     
            this.props.dogs.map((dog, i) => {
                return (<div key={dog.id} 
                    className={`grid-item grid-item-${i}`}>
                    <img width='100' src={dog.img} alt={dog.name}/>
                    <div className='breed-label'><span>{dog.name}</span></div>
                </div>)
        })
   )}
}

export default class BreedsGrid extends Component {

    dogService = new DogService()
    state = {
    dogs: [],
    loading: false,
    page: 0,
    scrolledToBottom: false,
    }

    componentDidMount() {
        this.fetchDogs(this.state.page)
    }

    componentDidUpdate(prevState, prevProps) {
        if (this.state.scrolledToBottom !== prevProps.scrolledToBottom) {
        this.fetchDogs(this.state.page)
         }
    }

    fetchDogs(page) {
        this.dogService.getDogsByPage(page)
        .then(data => 
        this.setState(({dogs, page}) => {
            return {
                dogs: [...dogs, ...data], 
                loaded: true, 
                scrolledToBottom: false,
                page: ++page
            }
        }))
        .catch(err => console.log(err))
    }

   onScrollChange = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target
        if (clientHeight+scrollTop >= scrollHeight - 5) {
                this.setState({ scrolledToBottom:true})
        }
    }

    render() {
        const { loaded, dogs} = this.state 
        return (
         <div className='grid' onScroll={this.onScrollChange}>
            {loaded ? <Images dogs={dogs}/>  : <Loader />} 
        </div>
        )
    }
}