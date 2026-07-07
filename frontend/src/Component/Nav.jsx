import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { asyncLogOutUser } from '../Store/userAction'
import { asyncGetUser } from '../Store/userAction'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard', auth: true },
  { label: 'Vocab', to: '/vocab' },
  { label: 'Quiz', to: '/quiz' },
  { label: 'About', to: '/about' },
  { label: 'Login', to: '/login', guest: true },
  { label: 'Sign Up', to: '/register', guest: true },
]

const Nav = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const data = useSelector((state) => state.userReducers.user?.fullName) || [] ;
  console.log(data);

  useEffect(() => {
    dispatch(asyncGetUser());
  }, [dispatch]);


  const logoutHandler = async () => {
    dispatch(asyncLogOutUser());
    toast.success("User logout successfully");
    navigate('/');
  };

  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">

      <div className=" mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        <div>
          <NavLink to="/" className="text-xl font-bold tracking-wide text-white">
            Vocab<span className="text-indigo-400">Verse</span>
          </NavLink>
        </div>

        <div className='hidden items-center gap-5 lg:flex'>
          <NavLink className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/'>Home</NavLink>
          <NavLink className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full  " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/vocab'>Vocab</NavLink>
          <NavLink className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/quiz'>Quizzes</NavLink>
          <NavLink className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/about'>About</NavLink>

          {data.length != 0 ? (
            <>
              
              <NavLink className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/dashboard'>Dashboard</NavLink>
              <NavLink onClick={logoutHandler}  className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/'>Logut</NavLink>
            </>) :
            (<>
              <NavLink className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/login'>login</NavLink>

              <NavLink className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/register'>Register</NavLink>
            </>)}

        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-full border border-slate-700 p-2 text-slate-200 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            <NavLink onClick={() => setOpen(!open)} className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/'>Home</NavLink>
          <NavLink onClick={() => setOpen(!open)} className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full  " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/vocab'>Vocab</NavLink>
          <NavLink onClick={() => setOpen(!open)} className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/quiz'>Quizzes</NavLink>
          <NavLink onClick={() => setOpen(!open)} className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/about'>About</NavLink>

            {data.length != 0 ? (
            <>
              <NavLink onClick={logoutHandler}  className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} >Logut</NavLink>
              
              <NavLink className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/dashboard'>Dashboard</NavLink>
            </>) :
            (<>
              <NavLink onClick={() => setOpen(!open)} className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/login'>login</NavLink>
              <NavLink onClick={() => setOpen(!open)} className={(e) => e.isActive ? "bg-indigo-500/15 text-white px-3 py-2 rounded-full " : "text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-full"} to='/register'>Register</NavLink>
            </>)}

          </div>
        </div>
      )}
    </header>
  )
}

export default Nav
