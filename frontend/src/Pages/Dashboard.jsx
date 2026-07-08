import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDashboard } from '../Store/dashboardAction'
import { FcBearish } from "react-icons/fc";
import { FcPackage } from "react-icons/fc";
import { Link } from 'react-router-dom'


const Dashboard = () => {
  useEffect(() => {
    dispatch(getDashboard())
  }, [])

  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboardReducers.dashboard)
  const progress = dashboard?.weeklyProgress
  console.log(progress);

  const scores = progress?.map(item => item.score);

  const TotalWordLearned = dashboard?.stats?.totalWordsLearned
  const TotalQuizAttempt = dashboard?.stats?.totalQuizAttempted 
  const CurrentStreak = dashboard?.streak?.currentStreak
 
  console.log(CurrentStreak)
  console.log(TotalQuizAttempt)
  console.log(TotalWordLearned)
  const Accuracy = dashboard?.stats?.accuracy
  console.log(dashboard);



  const { user } = useSelector((state) => state.userReducers)
  if (!user) {
    return <h1>Loading...</h1>
  }
  console.log(user.fullName)

  const stats = [
    { label: 'Total Words Learned', value: `${dashboard?.stats?.totalWordsLearned || 0}` },
    { label: 'Total Quizzes Attempted', value: `${dashboard?.stats?.totalQuizAttempted || 0}` },
    { label: 'Average Score', value: `${dashboard?.stats?.averageScore || 0}` },
    { label: 'Accuracy', value: `${dashboard?.stats?.accuracy || 0}` },
    { label: 'Current Streak', value: `${dashboard?.streak?.currentStreak || 0}` },
    { label: 'Longest Streak', value: `${dashboard?.streak?.longestStreak || 0}` }
  ]

  const today = new Date().toISOString().split("T")[0];

  const todayData = progress?.find(
    item => new Date(item.date).toISOString().split("T")[0] === today
  );

  const todayLearnedWords = todayData?.learnedWords || 0;

  const goal = 10;

  const progressPercentage = Math.min(
    (todayLearnedWords / goal) * 100,
    100
  );

  console.log(todayLearnedWords);
  console.log(progressPercentage);

  const recentActivity = [
    '✔ Learned “Meticulous”',
    '✔ Completed Synonym Quiz',
    '✔ Saved 5 Words'
  ]

  const weakWords = [
    ...new Set(
      dashboard?.quizHistory?.flatMap(item => item.weakword) || []
    )
  ];
  console.log(weakWords)

  const savedWords = [
    ...new Set(
      dashboard?.quizHistory?.flatMap(item => item.saveword) || []
    )
  ];
  console.log(savedWords)

  // const achievements = ['Vocabulary Beginner', 'Quiz Master', '7 Day Streak', '100 Words Learned']
  const achievement = dashboard?.achievements
  

  const quizHistory = [
    { name: 'Synonym Quiz', score: '18/20', date: 'Today' },
    { name: 'Meaning Quiz', score: '16/20', date: 'Yesterday' }
  ]

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">Hello,  {user.fullName}👋</h1>
              <p className="mt-2 text-slate-400">Ready to learn today?</p>
            </div>
            <Link to="/profile" className="rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
              View Profile
            </Link>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
              <h2 className="text-xl font-semibold text-white">📊 Learning Stats</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <p className="mt-2 text-xl font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
              <h2 className="text-xl font-semibold text-white">📈 Progress</h2>
              <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Weekly Progress</p>
                  <div className="mt-4 flex h-32 items-end gap-2">
                    {scores?.map((value, index) => (
                      <div key={index} className="flex-1 rounded-t-xl bg-gradient-to-t from-cyan-500 to-indigo-400" style={{ height: `${value}%` }} />
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Today's Goal</p>
                  <p className="mt-3 text-lg font-semibold text-white">Learn 10 words</p>
                  <div className="mt-4 h-3 rounded-full bg-slate-800">
                    <div className="h-3 rounded-full bg-cyan-500" style={{ width: `${progressPercentage}%` }} />
                  </div>
                  <p className="mt-2 text-sm text-cyan-300">Progress {progressPercentage.toFixed(0)}%</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
              <h2 className="text-xl font-semibold text-white">🔥 Continue Learning</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {['Vocabulary Quiz', 'Revision', 'Synonyms Practice'].map((item) => (
                  <span key={item} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-300">{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
              <h2 className="text-xl font-semibold text-white">📚 Recent Activity</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                {recentActivity.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2"><FcPackage size={24} /> <span>Saved Words</span></h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {savedWords.map((word) => (
                  <span key={word} className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm text-amber-300">{word}</span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2"><FcBearish /> <span>Weak Words</span></h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {weakWords.map((word) => (
                  <span key={word} className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{word}</span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
              <h2 className="text-xl font-semibold text-white">🏆 Achievements</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {achievement?.map((badge) => (
                  <span key={badge} className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">{badge}</span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
              <h2 className="text-xl font-semibold text-white">📅 Quiz History</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                {quizHistory.map((quiz) => (
                  <div key={quiz.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    <div>
                      <p className="font-semibold text-white">{quiz.name}</p>
                      <p className="text-xs text-slate-400">{quiz.date}</p>
                    </div>
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-300">{quiz.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard