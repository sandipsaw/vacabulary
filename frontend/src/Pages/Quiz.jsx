import React, { useEffect, useMemo, useState } from 'react'
import { CgMathPlus } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

const quizQuestions = [
  {
    id: 1,
    word: 'Abandon',
    prompt: 'Choose the meaning of the word “Abandon”.',
    options: ['Leave behind', 'Support strongly', 'Build carefully', 'Collect eagerly'],
    correct: 0,
    hint: 'Starts with A',
    meaning: 'To leave behind completely.',
    synonym: 'Desert',
    antonym: 'Retain',
    mnemonic: 'A band of people leaves the place = abandon.',
    example: 'The crew had to abandon the ship.'
  },
  {
    id: 2,
    word: 'Meticulous',
    prompt: 'Which word best matches “Meticulous”?',
    options: ['Careless', 'Very detailed', 'Quick', 'Noisy'],
    correct: 1,
    hint: 'It describes attention to detail.',
    meaning: 'Showing great attention to detail.',
    synonym: 'Precise',
    antonym: 'Careless',
    mnemonic: 'Meticulous = every tiny detail matters.',
    example: 'She made a meticulous plan.'
  },
  {
    id: 3,
    word: 'Obsolete',
    prompt: 'Select the closest meaning of “Obsolete”.',
    options: ['Modern', 'Outdated', 'Useful', 'Bright'],
    correct: 1,
    hint: 'Think of old technology.',
    meaning: 'No longer in use because of new alternatives.',
    synonym: 'Outdated',
    antonym: 'Current',
    mnemonic: 'Old and no longer useful = obsolete.',
    example: 'The old software became obsolete.'
  },
  {
    id: 4,
    word: 'Eloquent',
    prompt: 'What does “Eloquent” mean?',
    options: ['Silent', 'Fluent and persuasive', 'Confused', 'Rude'],
    correct: 1,
    hint: 'Think of a speech.',
    meaning: 'Fluent or persuasive in speaking or writing.',
    synonym: 'Articulate',
    antonym: 'Inarticulate',
    mnemonic: 'An eloquent speaker sounds elegant.',
    example: 'He gave an eloquent speech.'
  },
  {
    id: 5,
    word: 'Diligent',
    prompt: 'Which option best describes “Diligent”?',
    options: ['Lazy', 'Hard-working', 'Fearful', 'Shy'],
    correct: 1,
    hint: 'It is a positive trait.',
    meaning: 'Showing careful and persistent work.',
    synonym: 'Industrious',
    antonym: 'Idle',
    mnemonic: 'Diligent people work with diligence.',
    example: 'She is a diligent student.'
  }
]

const Quiz = () => {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [statuses, setStatuses] = useState(() => Object.fromEntries(quizQuestions.map((q) => [q.id, 'not-visited'])))
  const [bookmarked, setBookmarked] = useState([])
  const [confidence, setConfidence] = useState({})
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60)

  const currentQuestion = quizQuestions[currentIndex]
  const currentStatus = statuses[currentQuestion?.id] || 'not-visited'

  useEffect(() => {
    if (!started || finished) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setFinished(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [started, finished])

  const progressPercent = ((currentIndex + 1) / quizQuestions.length) * 100

  const answeredCount = Object.keys(answers).length
  const reviewCount = Object.values(statuses).filter((status) => status === 'review').length
  const skippedCount = Object.values(statuses).filter((status) => status === 'skipped').length
  const remainingCount = quizQuestions.length - answeredCount - reviewCount - skippedCount

  const resultSummary = useMemo(() => {
    const correct = quizQuestions.reduce((acc, question) => acc + (answers[question.id] === question.correct ? 1 : 0), 0)
    const wrong = quizQuestions.length - correct - skippedCount
    const accuracy = Math.round((correct / quizQuestions.length) * 100)
    const score = correct * 5
    const timeUsed = 15 * 60 - timeLeft

    return { correct, wrong, skipped: skippedCount, accuracy, score, timeUsed }
  }, [answers, skippedCount, timeLeft])

  const weakWords = useMemo(() => {
    return quizQuestions
      .filter((question) => answers[question.id] !== undefined && answers[question.id] !== question.correct)
      .map((question) => question.word)
  }, [answers])

  const handleSelectOption = (optionIndex) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }))
    setStatuses((prev) => ({ ...prev, [currentQuestion.id]: 'answered' }))
  }

  const goToNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setFinished(true)
    }
  }

  const handleSaveNext = () => {
    goToNext()
  }

  const handleMarkReview = () => {
    setStatuses((prev) => ({ ...prev, [currentQuestion.id]: 'review' }))
    goToNext()
  }

  const handleSkip = () => {
    setStatuses((prev) => ({ ...prev, [currentQuestion.id]: 'skipped' }))
    goToNext()
  }

  const toggleBookmark = () => {
    setBookmarked((prev) => (prev.includes(currentQuestion.word) ? prev.filter((word) => word !== currentQuestion.word) : [...prev, currentQuestion.word]))
  }

  const handleConfidence = (level) => {
    setConfidence((prev) => ({ ...prev, [currentQuestion.id]: level }))
  }

  const jumpToQuestion = (index) => {
    setCurrentIndex(index)
  }

  const resetQuiz = () => {
    setCurrentIndex(0)
    setAnswers({})
    setStatuses(Object.fromEntries(quizQuestions.map((q) => [q.id, 'not-visited'])))
    setBookmarked([])
    setConfidence({})
    setStarted(false)
    setFinished(false)
    setTimeLeft(15 * 60)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const getStatusClass = (status) => {
    if (status === 'answered') return 'bg-emerald-500 text-white'
    if (status === 'review') return 'bg-amber-400 text-slate-900'
    if (status === 'skipped') return 'bg-rose-500 text-white'
    return 'bg-slate-700 text-slate-300'
  }
  
  const addQuiz = () =>{
    navigate('/quiz/create')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 relative py-8 md:px-8">
      <div className='absolute right-10 bottom-5 fixed'>
        <button
        onClick={() => setStarted(true)}
        className="rounded-full  bg-cyan-500 p-2 text-white font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        <CgMathPlus  size={25} onClick={addQuiz}/>
      </button>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Vocabulary Quiz</p>
              <h1 className="mt-2 text-3xl font-semibold">{started ? 'Live Quiz Session' : 'Quiz Instructions & Start'}</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-400">
                Practice words with a smart learning experience including review, hints, bookmarking, analytics, and instant feedback.
              </p>

            </div>

            {!started && (


              <button
                onClick={() => setStarted(true)}
                className="rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Start Quiz
              </button>
            )}

          </div>

        </div>

        {!started ? (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
              <h2 className="text-2xl font-semibold">1. Quiz Instructions</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ['Total Questions', quizQuestions.length],
                  ['Time Limit', '15 Minutes'],
                  ['Passing Marks', '60%'],
                  ['Marks per Question', '5'],
                  ['Negative Marking', 'No'],
                  ['Difficulty', 'Medium']
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <p className="text-sm text-slate-400">{label}</p>
                    <p className="mt-1 font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-sm text-cyan-200">
                <p className="font-semibold">Quiz Category</p>
                <p className="mt-1">Vocabulary Building • Synonyms • Daily Word Practice</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
              <h2 className="text-2xl font-semibold">2. Quiz Information Card</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex justify-between"><span>Quiz Name</span><span className="font-semibold text-white">Vocabulary Sprint</span></div>
                <div className="flex justify-between"><span>Description</span><span className="font-semibold text-white">Word mastery in 15 mins</span></div>
                <div className="flex justify-between"><span>Estimated Time</span><span className="font-semibold text-white">15 mins</span></div>
                <div className="flex justify-between"><span>Words Covered</span><span className="font-semibold text-white">20 words</span></div>
                <div className="flex justify-between"><span>Created By</span><span className="font-semibold text-white">Admin</span></div>
                <div className="flex justify-between"><span>Last Updated</span><span className="font-semibold text-white">05 Jul 2026</span></div>
              </div>
            </div>
          </div>
        ) : !finished ? (
          <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Progress</p>
                    <h2 className="mt-1 text-xl font-semibold">Question {currentIndex + 1}/{quizQuestions.length}</h2>
                  </div>
                  <div className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-950/70 px-4 py-2 text-sm text-slate-300">
                    <span className="text-xl">⏱</span>
                    <span>{formatTime(timeLeft)} Remaining</span>
                  </div>
                </div>

                <div className="mt-4 h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${progressPercent}%` }} />
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
                  <span>Answered: {answeredCount}</span>
                  <span>Remaining: {remainingCount}</span>
                  <span>Review: {reviewCount}</span>
                  <span>Skipped: {skippedCount}</span>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-amber-400">Question</p>
                    <h3 className="mt-2 text-2xl font-semibold">{currentQuestion.word}</h3>
                    <p className="mt-3 text-slate-300">{currentQuestion.prompt}</p>
                  </div>
                  <button
                    onClick={toggleBookmark}
                    className={`rounded-full border px-3 py-2 text-sm ${bookmarked.includes(currentQuestion.word) ? 'border-amber-400 bg-amber-400/10 text-amber-300' : 'border-slate-700 bg-slate-950/70 text-slate-300'}`}
                  >
                    ⭐ {bookmarked.includes(currentQuestion.word) ? 'Bookmarked' : 'Bookmark'}
                  </button>
                </div>

                <div className="mt-6 grid gap-3">
                  {currentQuestion.options.map((option, index) => {
                    const selected = answers[currentQuestion.id] === index
                    return (
                      <button
                        key={option}
                        onClick={() => handleSelectOption(index)}
                        className={`rounded-2xl border px-4 py-3 text-left transition ${selected ? 'border-cyan-500 bg-cyan-500/10 text-cyan-200' : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-cyan-500/50'}`}
                      >
                        <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold">{String.fromCharCode(65 + index)}</span>
                        {option}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-cyan-300">Hint</p>
                      <p className="mt-1 text-sm text-slate-400">{currentQuestion.hint}</p>
                    </div>
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">💡 Tip</span>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-slate-300">How confident are you?</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Very Confident', 'Somewhat', 'Guess'].map((level) => (
                      <button
                        key={level}
                        onClick={() => handleConfidence(level)}
                        className={`rounded-full px-3 py-2 text-sm ${confidence[currentQuestion.id] === level ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={handleSaveNext} className="rounded-full bg-cyan-500 px-4 py-2 font-semibold text-slate-950">Save & Next</button>
                  <button onClick={handleMarkReview} className="rounded-full border border-amber-400/50 bg-amber-400/10 px-4 py-2 font-semibold text-amber-300">Mark for Review</button>
                  <button onClick={handleSkip} className="rounded-full border border-rose-400/50 bg-rose-400/10 px-4 py-2 font-semibold text-rose-300">Skip</button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                <h3 className="text-xl font-semibold">10. Quiz Summary Sidebar</h3>
                <div className="mt-4 grid gap-3 text-sm text-slate-300">
                  <div className="flex justify-between rounded-2xl bg-slate-950/70 px-3 py-2"><span>Answered</span><span className="font-semibold text-white">{answeredCount}</span></div>
                  <div className="flex justify-between rounded-2xl bg-slate-950/70 px-3 py-2"><span>Skipped</span><span className="font-semibold text-white">{skippedCount}</span></div>
                  <div className="flex justify-between rounded-2xl bg-slate-950/70 px-3 py-2"><span>Review</span><span className="font-semibold text-white">{reviewCount}</span></div>
                  <div className="flex justify-between rounded-2xl bg-slate-950/70 px-3 py-2"><span>Remaining</span><span className="font-semibold text-white">{remainingCount}</span></div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                <h3 className="text-xl font-semibold">5. Question Navigator</h3>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {quizQuestions.map((question, index) => (
                    <button
                      key={question.id}
                      onClick={() => jumpToQuestion(index)}
                      className={`h-10 rounded-xl text-sm font-semibold ${getStatusClass(statuses[question.id])}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-emerald-500" />Answered</span>
                  <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-amber-400" />Review</span>
                  <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-rose-500" />Skipped</span>
                  <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-slate-700" />Unvisited</span>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                <h3 className="text-xl font-semibold">8. Saved Words</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {bookmarked.length > 0 ? bookmarked.map((word) => (
                    <span key={word} className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm text-amber-300">{word}</span>
                  )) : <p className="text-sm text-slate-400">No words saved yet.</p>}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Result</p>
                  <h2 className="mt-2 text-3xl font-semibold">Quiz Completed</h2>
                  <p className="mt-3 text-sm text-emerald-100">You have completed the vocabulary challenge. Review your score and learn from the weak words below.</p>
                </div>
                <button onClick={resetQuiz} className="rounded-full bg-white px-5 py-3 font-semibold text-slate-950">Practice Again</button>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                  <h3 className="text-xl font-semibold">11. Result Analytics</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      ['Total Score', `${resultSummary.score}/25`],
                      ['Accuracy', `${resultSummary.accuracy}%`],
                      ['Time Taken', `${Math.floor(resultSummary.timeUsed / 60)}m ${resultSummary.timeUsed % 60}s`],
                      ['Correct', resultSummary.correct],
                      ['Wrong', resultSummary.wrong],
                      ['Skipped', resultSummary.skipped]
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                        <p className="text-sm text-slate-400">{label}</p>
                        <p className="mt-1 text-xl font-semibold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                  <h3 className="text-xl font-semibold">12. Weak Words</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {weakWords.length > 0 ? weakWords.map((word) => (
                      <span key={word} className="rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-sm text-rose-300">❌ {word}</span>
                    )) : <p className="text-sm text-slate-400">Great job! No weak words to review.</p>}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                  <h3 className="text-xl font-semibold">13. Word Explanation</h3>
                  <div className="mt-4 space-y-4">
                    {quizQuestions.filter((question) => answers[question.id] !== undefined && answers[question.id] !== question.correct).map((question) => (
                      <div key={question.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                        <p className="font-semibold text-white">{question.word}</p>
                        <p className="mt-2 text-sm text-slate-400">Meaning: {question.meaning}</p>
                        <p className="text-sm text-slate-400">Synonym: {question.synonym}</p>
                        <p className="text-sm text-slate-400">Antonym: {question.antonym}</p>
                        <p className="text-sm text-slate-400">Mnemonic: {question.mnemonic}</p>
                        <p className="text-sm text-slate-400">Example: {question.example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                  <h3 className="text-xl font-semibold">14. Leaderboard</h3>
                  <div className="mt-4 space-y-2 text-sm text-slate-300">
                    {[
                      ['1', 'Rahul', '98'],
                      ['2', 'Amit', '95'],
                      ['3', 'Sandip', '94']
                    ].map(([rank, name, score]) => (
                      <div key={name} className="flex items-center justify-between rounded-2xl bg-slate-950/70 px-3 py-2">
                        <span className="font-semibold text-white">#{rank} {name}</span>
                        <span>{score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                  <h3 className="text-xl font-semibold">15. Achievement Badges</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['🥇 Vocabulary Master', '🔥 7-Day Streak', '⚡ Speed Learner', '🎯 100% Accuracy'].map((badge) => (
                      <span key={badge} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">{badge}</span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                  <h3 className="text-xl font-semibold">16. Quiz History</h3>
                  <div className="mt-4 space-y-2 text-sm text-slate-300">
                    {[
                      ['05 Jul', '18/20', '90%', '6m'],
                      ['03 Jul', '15/20', '75%', '8m']
                    ].map(([date, score, accuracy, time]) => (
                      <div key={date} className="flex items-center justify-between rounded-2xl bg-slate-950/70 px-3 py-2">
                        <span>{date}</span>
                        <span>{score}</span>
                        <span>{accuracy}</span>
                        <span>{time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                  <h3 className="text-xl font-semibold">17. Recommended Practice</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Practice Synonyms', 'Practice Antonyms', 'Learn Difficult Words', 'Retry Wrong Answers'].map((item) => (
                      <span key={item} className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-sm text-slate-300">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                  <h3 className="text-xl font-semibold">18. Share Result</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button className="rounded-full bg-cyan-500 px-4 py-2 font-semibold text-slate-950">Share Score</button>
                    <button className="rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 font-semibold text-slate-300">Download PDF</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Quiz