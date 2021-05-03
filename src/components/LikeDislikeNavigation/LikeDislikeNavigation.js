import React , { Component }from 'react'
import './LikeDislikeNavigation.scss'
import { LikeIcon, DislikeIcon, FavIcon}  from '../Icons/Icons'

export default class LikeDislikeNavigation extends Component {
    render() {
        const buttons = [
            {name: 'like', icon: <LikeIcon />},
            {name: 'favorites', icon: <FavIcon />},
            {name: 'dislike', icon: <DislikeIcon />},
        ]
        return (
           <div className='like-dislike-navigation'>
               {buttons.map(btn => {
                   return (
                    <button key={btn.name} onClick={() => console.log(`clicked ${btn.name}`)}className={`like-dislike-btn`}> {btn.icon}</button>
                   )
               })}
           </div>
        )
    }
}