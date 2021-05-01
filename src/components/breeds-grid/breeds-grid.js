import React , { Component }from 'react'
import '../breeds-grid/breeds-grid.scss'
// import dog1 from './dogs/dog1.jpeg'
// import dog2 from './dogs/dog2.jpeg'
// import dog3 from './dogs/dog3.jpeg'
// import dog4 from './dogs/dog4.jpeg'
// import dog5 from './dogs/dog5.jpeg'
// import dog6 from './dogs/dog6.jpg'
// import dog7 from './dogs/dog7.jpeg'
// import dog8 from './dogs/dog8.jpeg'
// import dog9 from './dogs/dog9.jpeg'
// import dog10 from './dogs/dog10.jpeg'



export default class BreedsGrid extends Component {
    render() {

        return (
         <div className='grid'>
             {this.props.dogs.map((dog, i) => {
                 return (
                     <div key={dog.id} className={`grid-item grid-item-${dog.id}`}><img width='100' src={dog.img}/><div className='breed-label'><span>{dog.name}</span></div></div>
                 )
             })}
        </div>
        )
    }
}