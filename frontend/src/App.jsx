import React from 'react'
import Nav from './Component/Nav'
import MainRoutes from './Routes/Mainrouts'
import { useDispatch } from 'react-redux'
import { asyncGetUser } from './Store/userAction'
import { useEffect } from 'react'
import { asyncGetAllWords } from './Store/vocabAction'
import { asyncLoadQuiz } from './Store/quizAction'
import {asyncGetWordoftheDay} from './Store/wordAction'
const App = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(asyncGetUser())
    dispatch(asyncGetAllWords())
    dispatch(asyncLoadQuiz())
    dispatch(asyncGetWordoftheDay())
  },[])
  return (
    <div>
        <Nav />
        <MainRoutes />
    </div>
  )
}

export default App