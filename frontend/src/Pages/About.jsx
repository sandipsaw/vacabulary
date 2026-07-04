import React from 'react'

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

const About = () => {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
    </div>
    
  )
}

export default About