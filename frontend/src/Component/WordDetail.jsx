import React from 'react'

const WordDetail = () => {

    const {word} = useParams()
  return <>
    <div min-h-screen bg-slate-950 text-white p-6> {word}</div>
    <h1 className='text-5xl text-cyan-900'>slfjlsjf</h1>
  
  </>
}

export default WordDetail