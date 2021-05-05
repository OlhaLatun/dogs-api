import React , { Component }from 'react'
import './BreedsFilter.scss'
import { BackBtnIcon, AscenIcon, DescenIcon } from '../Icons/Icons'

export default class BreedsFilter extends Component {

    state = {
        selectedBreed: 'all breeds',
        limit: '20',
        order: 'ascen'
    }

    onClickAscen = (order) => {
        this.setState({order})
    }

    onClickDescen = (order) => {
        this.setState({order})
    }

    onBreedChange = (e) => {
        e.preventDefault()
       this.setState({selectedBreed: e.target.value})
       this.props.onBreedSelected(e.target.value)
    }

    onLimitChange = (e) => {
        e.preventDefault()
        this.setState({limit: e.target.value})
        this.props.onLimit(e.target.value)
    }

     render() {
        const { dogs } = this.props
        const { selectedBreed, limit } = this.state

        return (
            <div className='breeds-filter'>
            <div>
            <span className='btn-back'><BackBtnIcon /></span>
            <span className='breeds-label'>breeds</span>
            </div>
            <form className='breed-filter-form' >
                <select name='breeds' id='breedsSelect' value={selectedBreed} className='select breeds-select' 
                onChange={this.onBreedChange}>
                <option value='all'>All breeds</option>
                {dogs.map(dog => {
                    return ( <option key={dog.id} value={dog.name}>{dog.name}</option> )
                })}
                </select>
                <select name='limit' id='limitSelect' className='select limit-select' value={limit}
                onChange={this.onLimitChange}>
                <option value='5'>Limit: 5</option>
                <option value='10' >Limit: 10</option>
                <option value='15'>Limit: 15</option>
                <option value='20'>Limit: 20</option>
                </select>
            </form>
                <button className='btn btn-sort' onClick={() => this.onClickAscen('ascen')}><AscenIcon /></button>
                <button className='btn btn-sort' onClick={() => this.onClickDescen('descen')}><DescenIcon /></button>
            </div>
        )
    }
}