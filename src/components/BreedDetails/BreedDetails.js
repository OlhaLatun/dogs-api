import React, { Component } from 'react'
import { BackBtnIcon } from '../icons/icons'
import '../BreedDetails/BreedDetails.scss'

export default class BreedDetails extends Component {

    onClick = () => {
        this.props.backBtnClick()
    }

    render() {
        const { dog } = this.props
        return (
            <div className='breed-details'>
                <span className='btn-back' onClick={this.onClick}><BackBtnIcon /></span>
                <span className='breeds-label'>breeds</span>
                <span className='breed-id'>{dog.id}</span>
                <div className='img'>
                    <img src={dog.img} alt={dog.name} />
                </div>
                <div className='details'>
                    <h1>{dog.name}</h1>
                    <p>{dog.bredFor}</p>
                    <div className='flex'>
                        <div className='description'><span>Temperament:</span> {dog.temperament}</div>
                        <ul className='params'>
                            <li> <span>Height:</span> {dog.height} sm</li>
                            <li> <span>Weight:</span> {dog.weight} kg</li>
                            <li> <span>Life span:</span> {dog.lifeSpan} years </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}
