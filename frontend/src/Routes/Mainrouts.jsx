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

const Mainroute = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/vocab' element={<Vocab />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/vocab/create' element={<VocabCreate/>} />
        <Route path='/word/details/:id' element={<WordDetail/>} />
        <Route path='/word/:word' element={<Word/>} />
        <Route path='/section/:letter' element={<Section/>} />
    </Routes>
  )
}

export default Mainroute