import React , { Component }from 'react'
import './BreedsFilter.scss'
import { BackBtnIcon, AscenIcon, DescenIcon } from '../Icons/Icons'


export default class BreedsFilter extends Component {
    render() {
        return (
            <div className='breeds-filter'>
            <div>
            <span className='btn-back'><BackBtnIcon /></span>
            <span className='breeds-label'>breeds</span>
            </div>
            <form className='breed-filter-form'>
                <select name='breeds' id='breedsSelect' className='select breeds-select'>
                <option value='all'>All breeds</option>
                <option value='dog 1'>Dog 1</option>
                <option value='dog 2'>Dog 2</option>
                <option value='dog 3'>Dog 3</option>
                </select>
                <select name='limit' id='limitSelect' className='select limit-select'>
                <option value='5'>Limit: 5</option>
                <option value='10' >Limit: 10</option>
                <option value='15'>Limit: 15</option>
                <option value='20'>Limit: 20</option>
                </select>
                <button className='btn btn-sort'><AscenIcon /></button>
                <button className='btn btn-sort'><DescenIcon /></button>
            </form>
            </div>
        )
    }
}