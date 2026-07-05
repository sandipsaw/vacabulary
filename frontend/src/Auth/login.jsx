import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { asyncLoginUser } from '../Store/userAction'
import {toast} from 'react-toastify'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit, reset } = useForm()
  const [showPassword, setShowPassword] = useState(false)

  const LoginHandler = (userData) => {
    console.log("user data:",userData)
    dispatch(asyncLoginUser(userData))
    toast.success("Login Account successfully")
    reset()
    setTimeout(() => navigate('/'), 500)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.18),_transparent_30%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/30 lg:flex-row lg:p-8">
        <div className="flex-1 rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Welcome back</p>
          <h1 className="mt-4 text-3xl font-bold text-white">Continue your vocabulary journey.</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Sign in to review your saved words, challenge yourself, and keep your learning streak alive.
          </p>
        </div>

        <form onSubmit={handleSubmit(LoginHandler)} className="flex-1 rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="text-2xl font-bold text-white">Login</h2>
          <p className="mt-2 text-sm text-slate-400">Enter your email and password to continue.</p>

        

          <label className="mt-6 block text-sm text-slate-300">
            <span className="mb-2 block">Email</span>
            <input {...register('email', { required: true })} type="email" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-400" />
          </label>

          <label className="mt-4 block text-sm text-slate-300">
            <span className="mb-2 block">Password</span>
            <div className="relative">
              <input {...register('password', { required: true })} type={showPassword ? 'text' : 'password'} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 pr-16 text-white outline-none transition focus:border-indigo-400" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-indigo-300">
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <button type="submit" className="mt-6 w-full rounded-full bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400">
            Login
          </button>

          <p className="mt-4 text-center text-sm text-slate-400">
            New here? <Link to="/register" className="font-semibold text-indigo-300">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login