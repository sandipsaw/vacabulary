import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {asyncGetWordoftheDay} from '../Store/wordAction'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import image from '../assets/sandy.png'
import bgImage from '../assets/sandy1.png'
import bgImage2 from '../assets/sandy2.png'
import bgImage3 from '../assets/sandy3.png'
const features = [
  {
    title: '1000+ English Words',
    text: 'Learn common, advanced, academic, and business vocabulary in one place.',
    icon: '📚',
  },
  {
    title: 'Pronunciation Support',
    text: 'Hear the correct sounds and practice words with confidence.',
    icon: '🎧',
  },
  {
    title: 'Simple Meanings',
    text: 'Understand difficult words through plain, easy explanations.',
    icon: '💡',
  },
  {
    title: 'Real Example Sentences',
    text: 'See how each word is used in daily conversations and writing.',
    icon: '📝',
  },
  {
    title: 'Interactive Quizzes',
    text: 'Test yourself after every lesson and improve retention fast.',
    icon: '🧠',
  },
  {
    title: 'Daily Word Challenge',
    text: 'Build a study streak with a fresh word every single day.',
    icon: '🔥',
  },
]

const categories = [
  'Daily Vocabulary',
  'Business English',
  'Academic Words',
  'IELTS Vocabulary',
  'TOEFL Vocabulary',
  'Synonyms',
  'Antonyms',
  'Phrasal Verbs',
  'Idioms',
  'Slang',
  'Verbs',
  'Adjectives',
  'Nouns',
  'Advanced English',
]

const stats = [
  { value: '10K+', label: 'Words' },
  { value: '50K+', label: 'Students' },
  { value: '5K+', label: 'Quizzes' },
  { value: '4.9', label: 'Rating' },
]

const steps = [
  'Choose a vocabulary category.',
  'Read meanings with examples.',
  'Practice pronunciation.',
  'Take quizzes to improve memory.',
  'Track your progress.',
]

const testimonials = [
  {
    quote: 'This website helped me improve my English vocabulary for interviews.',
    name: 'Rahul',
  },
  {
    quote: 'The quizzes are fun and make learning easy.',
    name: 'Priya',
  },
  {
    quote: 'I learned hundreds of new words in just a few weeks.',
    name: 'Aman',
  },
]

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const startQuiz = () =>{
    Navigate('/quiz')
  }
  useEffect(()=>{
    dispatch(asyncGetWordoftheDay())
  },[])

  const TodayWord = useSelector((state)=>state.wordoftheDayReducers?.wordoftheDay)
  // console.log(TodayWord)
  //wordoftheDay
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section id="home" className=" relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.28),_transparent_35%),linear-gradient(135deg,_#111827,_#1f2937)]">
        <div className=" absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.16),_transparent_25%)]" />
        <div className="relative -mt-15 mx-auto flex max-w-7xl flex-col px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-sm font-semibold tracking-[0.25em] text-indigo-200 uppercase">
                Smart English Vocabulary Studio
              </span>
              <div className='lg:hidden block'>
              <img src={image}/>
            </div>
              <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Expand Your Vocabulary. Speak with Confidence.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Learn new English words every day with simple meanings, pronunciation, examples, quizzes, and interactive exercises. Improve your communication, writing, and exam performance.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#categories" className="rounded-full bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-400">
                  🚀 Get Started
                </a>
                <button onClick={()=>navigate('/vocab')} className="rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 font-semibold text-slate-100 transition hover:border-indigo-400 hover:text-indigo-200">
                  📖 Explore Words
                </button>
                <button onClick={()=>navigate('/quiz')} className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-3 font-semibold text-emerald-200 transition hover:bg-emerald-500/20">
                  🎯 Take Quiz
                </button>
              </div>
            </div>
            <div className='lg:block hidden'>
              <img src={image}/>
            </div>

            {/* <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-200">Today&apos;s Focus</p>
                <h2 className="mt-3 text-2xl font-bold text-white">Master words that make you sound sharper</h2>
                <div className="mt-5 space-y-3 text-slate-300">
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-900/80 p-3">
                    <span className="text-xl">✨</span>
                    <span>Pronunciation, examples, and memory tricks in one place.</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-900/80 p-3">
                    <span className="text-xl">📈</span>
                    <span>Track your progress and keep a daily learning streak.</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Why Choose Us</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Why Learn With Us?</h2>
          <p className="mt-3 text-lg text-slate-300">
            Learning vocabulary does not have to be difficult. We provide easy explanations, real-life examples, and fun quizzes that help you remember words faster.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-400">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-8 lg:p-8 shadow-xl shadow-black/20">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Categories</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Learn by Category</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <span key={item} className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-100">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="word-of-the-day" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-600/20 to-slate-900 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Word of the Day</p>
            <h2 className="mt-3 text-3xl font-bold text-white">{TodayWord?.word}</h2>
            <p className="mt-4 text-slate-300"><span className="font-semibold text-white">Meaning:</span> {TodayWord?.definition}</p>
            <p className="mt-2 text-slate-300"><span className="font-semibold text-white">Pronunciation:</span> /ˈeləkwənt/</p>
            <p className="mt-2 text-slate-300"><span className="font-semibold text-white">Example:</span> {TodayWord?.examples}</p>
            <p className="mt-4 text-slate-300"><span className="font-semibold text-white">Synonyms:</span> {TodayWord?.synonyms}</p>
            <a href="#challenge" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100">
              Learn More
            </a>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 bg-no-repeat lg:bg-top bg-center flex flex-col " style={{
        backgroundImage: `url(${bgImage})` ,backgroundSize: "350px",}}>
            <h3 className="text-2xl font-semibold text-white">Why it matters</h3>
            <p className="mt-4 text-lg leading-8 text-[#D1D5DB]">
              Use powerful words to sound more confident in interviews, essays, and everyday conversations.
            </p>
          </div>
        </div>
      </section>

      <section id="challenge" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-black/20">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Daily Challenge</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Challenge Yourself</h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                Improve your vocabulary every day with quick quizzes, flashcards, and word games designed for faster learning.
              </p>
              <ul className="mt-5 grid gap-2 text-slate-300 sm:grid-cols-2">
                <li>• Multiple Choice Questions</li>
                <li>• Fill in the Blanks</li>
                <li>• Match the Words</li>
                <li>• Flashcards and Games</li>
              </ul>
            </div>
            <a href="/quiz" className="inline-flex rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-400">
              <button onClick={startQuiz}>Start Quiz</button>
            </a>
          </div>
        </div>
      </section>

      <section id="stats" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800 p-4 sm:p-8 lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Trusted by Learners</p>
          <div className="mt-6 grid gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Learning Process</p>
            <h2 className="mt-3 text-3xl font-bold text-white">How It Works</h2>
            <div className="mt-6 space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-200">
                    {index + 1}
                  </div>
                  <p className="text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-8 bg-no-repeat bg-center" style={{
        backgroundImage: `url(${bgImage3})` ,backgroundSize: "400px"}}>
            <h3 className="text-2xl font-semibold text-white">Stay consistent and build confidence</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              A simple routine of reading, listening, practicing, and revising makes vocabulary learning feel effortless.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Testimonials</p>
          <h2 className="mt-3 text-3xl font-bold text-white">What Our Learners Say</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
              <div className="text-amber-400">★★★★★</div>
              <p className="mt-4 text-slate-300">“{item.quote}”</p>
              <p className="mt-4 font-semibold text-white">— {item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-indigo-400/20 bg-gradient-to-r from-indigo-600/20 to-emerald-500/10 p-8 text-center shadow-xl shadow-black/20">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Improve Your English?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Start learning thousands of English words today and become a more confident speaker and writer.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#categories" className="rounded-full bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100">
              Get Started
            </a>
            <a href="#word-of-the-day" className="rounded-full border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
              Explore Vocabulary
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950/90">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><a href="#home" className="hover:text-indigo-300">Home</a></li>
              <li><a href="#categories" className="hover:text-indigo-300">Vocabulary</a></li>
              <li><a href="#categories" className="hover:text-indigo-300">Categories</a></li>
              <li><a href="#challenge" className="hover:text-indigo-300">Quiz</a></li>
              <li><a href="#about" className="hover:text-indigo-300">About</a></li>
              <li><a href="#contact" className="hover:text-indigo-300">Contact</a></li>
              <li><a href="#" className="hover:text-indigo-300">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><a href="#word-of-the-day" className="hover:text-indigo-300">Daily Word</a></li>
              <li><a href="#challenge" className="hover:text-indigo-300">Flashcards</a></li>
              <li><a href="#challenge" className="hover:text-indigo-300">Word Games</a></li>
              <li><a href="#" className="hover:text-indigo-300">Grammar</a></li>
              <li><a href="#" className="hover:text-indigo-300">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Social</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-indigo-300">Facebook</a></li>
              <li><a href="#" className="hover:text-indigo-300">Instagram</a></li>
              <li><a href="#" className="hover:text-indigo-300">LinkedIn</a></li>
              <li><a href="#" className="hover:text-indigo-300">YouTube</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home