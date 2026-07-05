import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetUser } from '../Store/userAction'
const Profile = () => {
    
    const user = useSelector((state)=>state.userReducers)
    console.log(user)

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/30">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 text-3xl font-bold text-white">
              S
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Profile</p>
              <h1 className="text-3xl font-semibold text-white">Sandip Sharma</h1>
              <p className="mt-2 text-sm text-slate-400">Vocabulary learner • Level 5</p>
            </div>
          </div>

          <Link to="/dashboard" className="rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold text-white">User Information</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                <span>Name</span>
                <span className="font-semibold text-white">Sandip Sharma</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                <span>Email</span>
                <span className="font-semibold text-white">sandip@example.com</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                <span>Username</span>
                <span className="font-semibold text-white">@sandip</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                <span>Joined Date</span>
                <span className="font-semibold text-white">02 Jan 2026</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                <span>Level</span>
                <span className="font-semibold text-white">Intermediate</span>
              </div>
            </div>

            <button className="mt-6 rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
              Edit Profile
            </button>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold text-white">Learning Snapshot</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ['Words Learned', '356'],
                ['Quizzes Attempted', '42'],
                ['Accuracy', '88%'],
                ['Best Streak', '14 days']
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">{label}</p>
                  <p className="mt-1 text-xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
