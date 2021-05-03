import React , { Component } from 'react'
import './BreedsGrid.scss'

export default class BreedsGrid extends Component {
    render() {

        return (
         <div className='grid'>
             {this.props.dogs.map((dog) => {
                 return (
                     <div key={dog.id} className={`grid-item grid-item-${dog.id}`}><img width='100' src={dog.img} alt={dog.name}/><div className='breed-label'><span>{dog.name}</span></div></div>
                 )
             })}
        </div>
        )
    }
}