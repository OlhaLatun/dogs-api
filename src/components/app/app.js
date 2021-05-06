import React, { Component } from 'react'
import logo from './img/logo.png'
import Container from '../Container'
import './App.scss'

class HomePageNavigation extends Component {

    onClickChange = (route) => {
        this.props.onRouteChange(route)
    }

    render() {
        const navItems = [
            { id: 'v', name: 'voting' },
            { id: 'b', name: 'breeds' },
            { id: 'g', name: 'gallery' },
        ]

        return (
            <React.Fragment>
                <img className='logo' src={logo} alt='logo' />
                <h1 className='heading'>Hi, MacPaw team!</h1>
                <p className='description'>I'm glad to try my hand at MSI 2021 Front-end test</p>
                <h4>Let's start using The Dog API</h4>
                <div className='navigation'>
                    {navItems.map(item => {
                        return (
                            <div key={item.id} className='card'>
                                <div className={`card-img card-${item.name}`}>
                                </div>
                                <button className='nav-btn' onClick={() => this.onClickChange(item.name)}>
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
}

export default class App extends Component {

    state = {
        route: null
    }

    routeChange = (route) => {
        this.setState({ route })
    }

    render() {
        return (
            <React.Fragment>
                <div className='base'>
                    <HomePageNavigation onRouteChange={this.routeChange} />
                </div>
                <Container route={this.state.route} />
            </React.Fragment>
        )
    }
}