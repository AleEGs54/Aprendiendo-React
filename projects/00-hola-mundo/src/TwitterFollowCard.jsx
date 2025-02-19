import { useState } from 'react';
import './App.css';

export function TwitterFollowCard ({children,userName='unknown', name}){

    // const state = useState(false) //Almacena useState y darle un parametro que sera default, para comenzar desde alli
    // const isFollowing = state[0] // Devuelve 2 parametros: [0] => el valor del estado (false en este caso), [1]: una funcion para cambiar ese estado (de false a true o visceversa)
    // const setFollowing = state[1]

    const [isFollowing, setFollowing] = useState(false); //igual que lo de arriba pero en una sola linea

    const text = isFollowing ? 'Following' : 'Follow'
    const buttonClassName = isFollowing ? 'tw-follow-card-button is-following' : 'tw-follow-card-button'

    const handleClick = () => {
        setFollowing(!isFollowing)
    }
 

    return(


    <article className='tw-follow-card'>
        <header className='tw-follow-card-header'>
            <img 
            className='tw-follow-card-avatar'
            src={`https://unavatar.io/${userName}`} alt="Profile Picture" />
            <div className='tw-follow-card-info'>
                <strong>{children}</strong>
                <span className='tw-follow-card-infoUserName'>@{userName}</span>
            </div>
        </header>
        <aside>
            <button className={buttonClassName} onClick={handleClick}>
                {text}
            </button> 
        </aside>
    </article>


    )
}