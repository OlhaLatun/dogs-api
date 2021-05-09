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

class BreedsGrid extends Component {

    dogService = new DogService()
    state = {
        dogs: [],
        loading: false,
        page: 0,
        scrolledToBottom: false,
        selectedDog: false
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

        if (this.props.selectedBreed !== prevProps.selectedBreed) {
            this.setState({ selectedDog: this.props.selectedBreed })
        }

    }

    getDogName(dog) {
        return dog.indexOf(' ') ? dog.substr(0, dog.indexOf(' ')) : dog
    }

    onScrollChange = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target
        const { limit, order } = this.props
        if (clientHeight + scrollTop >= scrollHeight - 5) {
            this.setState(({ page }) => {
                return {
                    page: ++page
                }
            })
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
                        dogsCount: dogs.length
                    }
                }))
            .catch(err => console.log(err))
    }

    onClick = (e) => {
        this.props.onClick(e.target.firstChild.innerHTML)
    }

    render() {
        const { dogs, loading, selectedDog } = this.state
        const dogsToShow = selectedDog ? [selectedDog] : dogs


        return (
            <div className='grid' onScroll={this.onScrollChange} onClick={this.onClick}>
                {loading ? <Images dogs={dogsToShow} /> : <Loader />}
            </div>
        )
    }
}
export { Images, BreedsGrid }