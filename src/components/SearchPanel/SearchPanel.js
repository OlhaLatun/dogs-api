import React, { Component } from 'react'
import './SearchPanel.scss'
import { MagnifierIcon } from '../Icons/icons'

export default class SearchPanel extends Component {
    render() {
        return (
            <form className='search-panel' onSubmit={(e) => e.preventDefault()}>
                <input className='search-input' onChange={(e) => console.log(e.target.value)} type='text' placeholder='Search for breeeds by name' />
                <button className='btn btn-search'><MagnifierIcon /></button>
            </form>
        )
    }
}
