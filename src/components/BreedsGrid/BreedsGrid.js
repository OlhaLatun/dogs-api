import React, { Component } from 'react'
import DogService from '../../api/dog-service.js'
import './BreedsGrid.scss'
import Loader from '../Loader'

class Images extends Component {

    render() {
        return (
            this.props.dogs.map((dog, i) => {
                return (<div key={i}
                    className='grid-item'>
                    <img key={i} width='100' src={dog.img} alt={dog.name} />
                    <div className='breed-label'><span>{dog.name}</span></div>
                </div>)
            })
        )
    }
}

export default class BreedsGrid extends Component {

    dogService = new DogService()
    state = {
        dogs: [],
        loading: false,
        page: 0,
        scrolledToBottom: false
    }

    componentDidMount() {
        const { limit, order } = this.props
        const { page } = this.state
        this.fetchDogs(limit, page, order)
    }

    componentDidUpdate(prevProps) {

        if (this.props.order !== prevProps.order) {
            this.fetchDogs(this.props.limit, this.state.page, this.props.order)
        }

        if (this.props.limit !== prevProps.limit) {
            console.log('limit changed')
            // this.fetchDogs(this.props.limit, 0, this.props.order)
        }

        if (this.props.selectedBreed !== prevProps.selectedBreed) {
            console.log('dog changed')
            // this.fetchDogs(this.props.limit, 0, this.props.order)
        }

    }

    onScrollChange = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target
        const { limit, order } = this.props
        if (clientHeight + scrollTop >= scrollHeight - 5) {
            this.setState({ page: ++this.state.page })
            this.fetchDogs(limit, this.state.page, order)
        }

    }

    fetchDogs(limit, page, order) {
        this.dogService.getDogsByPage(limit, page, order)
            .then(data =>
                this.setState(({ dogs }) => {
                    return {
                        dogs: [...dogs, ...data],
                        loading: true,
                    }
                }))
            .catch(err => console.log(err))
    }

    render() {
        const { dogs, loading } = this.state
        return (
            <div className='grid' onScroll={this.onScrollChange}>
                {loading ? <Images dogs={dogs} /> : <Loader />}
            </div>
        )
    }
}

