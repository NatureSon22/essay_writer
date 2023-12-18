import './App.css'
import './Effect.css'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import FieldInput from './components/FieldInput'
import EssayOutput from './components/EssayOutput'
import { useState } from 'react'

function App() {
  const [firstEntry, setEntry] = useState(false);
  const [essayInfo, getEssay] = useState({title: '', essay: ''});
  
  return (
    <div className="container">
      <NavBar></NavBar>
      <main>
        <HeroSection></HeroSection>
        <FieldInput essay={essayInfo} getEssay={getEssay} getData={setEntry}></FieldInput>
        <EssayOutput data={firstEntry} essay={essayInfo}></EssayOutput>
      </main>
    </div>
  )
}

export default App
