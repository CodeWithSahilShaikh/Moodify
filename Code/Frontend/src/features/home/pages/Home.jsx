import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression.jsx'
import Player from '../components/Player.jsx'
import { useSong } from "../hooks/useSong"
import Navbar from '../../shared/components/Navbar.jsx'
import "./home.scss"

const Home = () => {
  const { handleGetSong } = useSong();
  return (
    <div className="home-page">
      <Navbar />
      <header className="home-header">
        <p>Let your face pick the music.</p>
      </header>
      
      <main className="home-main">
        <FaceExpression onClick={(expression) => { handleGetSong({ mood: expression})}} />
      </main>

      <Player />
    </div>
  )
}

export default Home