import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { asyncRegisterUser } from '../Store/userAction'
import { toast } from 'react-toastify'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, reset, watch } = useForm()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [message, setMessage] = useState('')

  const password = watch('password', '')

  const passwordStrength = (value = '') => {
    let score = 0
    if (value.length >= 8) score += 1
    if (/[A-Z]/.test(value)) score += 1
    if (/[0-9]/.test(value)) score += 1
    if (/[^A-Za-z0-9]/.test(value)) score += 1

    if (score <= 1) return { label: 'Weak', color: 'bg-red-500' }
    if (score === 2) return { label: 'Fair', color: 'bg-amber-500' }
    if (score === 3) return { label: 'Good', color: 'bg-sky-500' }
    return { label: 'Strong', color: 'bg-emerald-500' }
  }

  const strength = passwordStrength(password)

  const registerHandler = (userData) => {
    console.log(userData)
    if (userData.password !== userData.confirmPassword) {
      setMessage('Passwords do not match')
      return
    }
    dispatch(asyncRegisterUser(userData))
    setMessage(`Welcome ${userData.fullName}! Your account is ready.`)
    toast.success("urer Account created successfully")
    reset()
    setTimeout(() => navigate('/login'), 500)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.25),_transparent_30%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Join VocabVerse</p>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Create your account and start learning faster.</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Save your favorite words, track your progress, and build a stronger vocabulary with a simple account.
          </p>
          <ul className="mt-6 space-y-3 text-slate-300">
            <li>• Personalized vocab practice</li>
            <li>• Daily progress tracking</li>
            <li>• Quick access to your saved words</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit(registerHandler)} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 sm:p-8">
          <h2 className="text-2xl font-bold text-white">Create an account</h2>
          <p className="mt-2 text-sm text-slate-400">Fill in the details below to get started.</p>

          {message && <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{message}</div>}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-300 sm:col-span-2">
              <span className="mb-2 block">Full name</span>
              <input {...register('fullName', { required: true })} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-400" />
            </label>

            <label className="block text-sm text-slate-300 sm:col-span-2">
              <span className="mb-2 block">Email</span>
              <input {...register('email', { required: true })} type="email" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-400" />
            </label>

            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Mobile number</span>
              <input {...register('mobile')} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-400" />
            </label>

            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Password</span>
              <div className="relative">
                <input {...register('password', { required: true, minLength: 6 })} type={showPassword ? 'text' : 'password'} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 pr-16 text-white outline-none transition focus:border-indigo-400" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-indigo-300">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-800">
                <div className={`h-2 rounded-full ${strength.color}`} style={{ width: `${(password.length / 12) * 100}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-400">Strength: {strength.label}</p>
            </label>

            <label className="block text-sm text-slate-300 sm:col-span-2">
              <span className="mb-2 block">Confirm password</span>
              <div className="relative">
                <input {...register('confirmPassword', { required: true })} type={showConfirm ? 'text' : 'password'} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 pr-16 text-white outline-none transition focus:border-indigo-400" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-indigo-300">
                  {showConfirm ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>
          </div>

          <button type="submit" className="mt-6 w-full rounded-full bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400">
            Register
          </button>

          <p className="mt-4 text-center text-sm text-slate-400">
            Already have an account? <Link to="/login" className="font-semibold text-indigo-300">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register