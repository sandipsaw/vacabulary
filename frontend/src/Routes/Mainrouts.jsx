import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import  Vocab  from '../Pages/Vocab.jsx'
import VocabCreate from '../Pages/vocab/VocabCreate'
import WordDetail from '../Component/WordDetail.jsx'
import Word from '../Component/Word.jsx'
import Section from '../Component/Section.jsx'
import CreateQuiz from '../Component/CreateQuiz.jsx'
import Quiz from '../Pages/Quiz.jsx'
import Dashboard from '../Pages/Dashboard.jsx'
import Profile from '../Pages/Profile.jsx'

const Mainroute = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/vocab' element={<Vocab />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/vocab/create' element={<VocabCreate/>} />
        <Route path='/word/details:word' element={<WordDetail/>} />
        <Route path='/word/:word' element={<Word/>} />
        <Route path='/section/:letter' element={<Section/>} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/quiz/create' element={<CreateQuiz />} />
    </Routes>
  )
}

export default Mainroute