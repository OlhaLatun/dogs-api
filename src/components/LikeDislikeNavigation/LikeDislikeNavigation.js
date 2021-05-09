import React, { Component } from 'react'
import './LikeDislikeNavigation.scss'
import { LikeIcon, DislikeIcon, FavIcon } from '../icons/icons'

export default class LikeDislikeNavigation extends Component {

    onClick = (e) => {
        this.props.onClick(e.target.id || e.target.classList[0])
    }

    render() {
        const buttons = [
            { name: 'like', icon: <LikeIcon /> },
            { name: 'favorites', icon: <FavIcon /> },
            { name: 'dislike', icon: <DislikeIcon /> },
        ]
        return (
            <div className='like-dislike-navigation'>
                {buttons.map(btn => {
                    return (
                        <button key={btn.name} id={btn.name} onClick={this.onClick} className='like-dislike-btn'> {btn.icon}</button>
                    )
                })}
            </div>
        )
    }
}
