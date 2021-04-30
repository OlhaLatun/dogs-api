import React , { Component }from 'react'
import logo from '../app/logo.png'
import petBreeds from '../app/pet-breeds.png'
import voteTable from '../app/vote-table.png'
import imagesSearch from '../app/images-search.png'
import Container from '../container/container'
import '../app/app.scss'

const HomePageNavigation = () => {
    const navItems = [
        { id: 'v', name: 'voting', img: voteTable},
        {id: 'b', name: 'breeds', img: petBreeds},
        {id: 'g', name: 'gallery', img: imagesSearch},
    ]

    return (
        <React.Fragment>
        <img className='logo' src={logo}/>
        <h1 className='heading'>Hi, MacPaw team!</h1>
        <p className='description'>I'm glad to try my hand at MSI 2021 Front-end test</p>
        <h4>Let's start using The Dog API</h4>
        <div className='navigation'>
                {navItems.map(item => {
                    return (
                        <div key={item.id} className='card'>
                            <div className={`card-img card-${item.name}`}>
                            </div>
                            <button className='nav-btn' onClick={() => console.log('clicked', item.name)}>
                                {item.name}
                            </button>
                        </div>  
                    )
                })
            }
        </div>
        </React.Fragment>
    )
}

export default class App extends Component {
    render() {
        return (
            <React.Fragment>
            <div className='base'>
                <HomePageNavigation />
            </div>
               <Container />
             </React.Fragment>
        )
    }
}