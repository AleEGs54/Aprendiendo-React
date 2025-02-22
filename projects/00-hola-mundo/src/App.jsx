import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard.jsx';

const users = [
    {
        userName: "midudev",
        name: "Miguel Angel Duran",
        isFollowing: true
    },
    {
        userName: "aleegs54",
        name: "Alejandro Esteves",
        isFollowing: false
    },
    {
        userName: "pheralb",
        name: "Pablo H.",
        isFollowing: false
    },
    {
        userName: "TMChein",
        name: "Tomas",
        isFollowing: false
    }
]

export function App (){

    
    
    return(
        <section className='App'>
        {
        users.map(user => {
            const {userName, name, isFollowing} = user
            return (
                <TwitterFollowCard
                key={userName}
                userName={userName}
                initialIsFollowing={isFollowing}
                >
                    {name}
                </TwitterFollowCard >
            )
        })
        }
        </section>
    )
}