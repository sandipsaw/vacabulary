import React from 'react'
import Nav from './Component/Nav'
import MainRoutes from './Routes/Mainrouts'
import { useDispatch } from 'react-redux'
import { asyncGetUser } from './Store/userAction'
import { useEffect } from 'react'
const App = () => {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(asyncGetUser())
  },[])
  return (
    <div>
        <Nav />
        <MainRoutes />
    </div>
  )
}

export default App