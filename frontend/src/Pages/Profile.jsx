import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetUser } from '../Store/userAction'
import { getDashboard } from '../Store/dashboardAction'
import { useEffect } from 'react'
const Profile = () => {


  useEffect(() => {
    dispatch(getDashboard())
  }, [])

  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboardReducers.dashboard)


  const { user } = useSelector((state) => state.userReducers)
  if (!user) {
    return <h1>Loading...</h1>
  }
  console.log(user.fullName)

  const stats = [
    { label: 'Words Learned', value: `${dashboard?.stats?.totalWordsLearned || 0}` },
    { label: 'Quizzes Attempted', value: `${dashboard?.stats?.totalQuizAttempted || 0}` },
    // { label: 'Average Score', value: `${dashboard?.stats?.averageScore || 0}` },
    { label: 'Accuracy', value: `${dashboard?.stats?.accuracy || 0}` },
    // { label: 'Current Streak', value: `${dashboard?.streak?.currentStreak || 0}` },
    { label: 'Best Streak', value: `${dashboard?.streak?.longestStreak || 0}` }
  ]
  const date = user.createdAt

  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  console.log(formattedDate);


  if (!user) {
    return <h1>Loading...</h1>;
  }

  // const val =Math.floor(1000 + Math.random() * 9000);


  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/30">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 text-3xl font-bold text-white">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Profile</p>
              <h1 className="text-3xl font-semibold text-white">{user.fullName}</h1>
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
                <span className="font-semibold text-white">{user.fullName}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                <span>Email</span>
                <span className="font-semibold text-white">{user.email}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                <span>Username</span>
                <span className="font-semibold text-white">{user.fullName.toLowerCase().replace(" ", "_")}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                <span>Joined Date</span>
                <span className="font-semibold text-white">{formattedDate}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                <span>Level</span>
                <span className="font-semibold text-white">Intermediate</span>
              </div>
            </div>

            {/* <button className="mt-6 rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
              Edit Profile
            </button> */}
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold text-white">Learning Snapshot</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="mt-1 text-xl font-semibold text-white">{stat.value}</p>
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
