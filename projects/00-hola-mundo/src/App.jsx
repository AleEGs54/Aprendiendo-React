import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard.jsx';

export function App (){

    return(
        <section className='App'>
        <TwitterFollowCard   userName='midudev'>
        Miguel Angel Duran
        </TwitterFollowCard>
        <TwitterFollowCard   userName='github'>
        Github
        </TwitterFollowCard>
        <TwitterFollowCard   userName='aleegs54'>
        Alejandro Esteves
        </TwitterFollowCard>
        </section>
    )
}