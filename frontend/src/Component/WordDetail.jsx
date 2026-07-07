import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { asyncGetWordById } from '../Store/vocabAction';
import {
  FaBook,
  FaLightbulb
} from "react-icons/fa";

import { MdOutlineSchool } from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";

const WordDetail = () => {

  const {id} =useParams()
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(asyncGetWordById(id));
  }, [dispatch, id]);

  const word = useSelector((state) => state.vocabReducers.SingleWord);
  console.log(word);

  if (!word) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <h1 className="text-3xl text-white font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Word */}
        <div className="rounded-3xl bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg p-8">
          <div className="flex justify-between items-center">

            <div>
              <h1 className="text-5xl font-extrabold text-indigo-700">
                {word.word}
              </h1>

              <p className="text-gray-600 mt-2 text-lg">
                {word.pos}
              </p>
            </div>

            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold">
              {word.letter}
            </div>
          </div>
        </div>

        {/* Definition */}
        <div className="rounded-3xl bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-3 mb-4">
            <FaBook />
            Definition
          </h2>

          <p className="text-gray-700 leading-8 text-lg">
            {word.definition}
          </p>
        </div>

        {/* Example */}
        <div className="rounded-3xl bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Example Sentence
          </h2>

          {Array.isArray(word.examples) ? (
            <ul className="space-y-3">
              {word.examples.map((item, index) => (
                <li
                  key={index}
                  className="bg-slate-100 rounded-xl p-4 text-gray-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-slate-100 rounded-xl p-4 text-gray-700">
              {word.examples}
            </div>
          )}
        </div>

        {/* Synonyms */}
        <div className="rounded-3xl bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-3 mb-4">
            <TbArrowsExchange />
            Synonyms
          </h2>

          <div className="flex flex-wrap gap-3">
            {Array.isArray(word.synonyms) ? (
              word.synonyms.map((item) => (
                <span
                  key={item}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold">
                {word.synonyms}
              </span>
            )}
          </div>
        </div>



        <div className="rounded-3xl bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-3 mb-4">
            <TbArrowsExchange />
            Antonyms
          </h2>

          <div className="flex flex-wrap gap-3">
            {Array.isArray(word.synonyms) ? (
              word.antonyms.map((item) => (
                <span
                  key={item}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold">
                {word.antonyms}
              </span>
            )}
          </div>
        </div>

        {/* Hint */}
        <div className="rounded-3xl bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-3 mb-4">
            <FaLightbulb />
            Memory Hint
          </h2>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-xl p-5 text-gray-700">
            {word.hint}
          </div>
        </div>

        {/* Exams */}
        <div className="rounded-3xl bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-3 mb-4">
            <MdOutlineSchool />
            Asked In Exams
          </h2>

          <div className="flex flex-wrap gap-3">
            {Array.isArray(word.exams) ? (
              word.exams.map((exam) => (
                <span
                  key={exam}
                  className="bg-emerald-600 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  {exam}
                </span>
              ))
            ) : (
              <span className="bg-emerald-600 text-white px-5 py-2 rounded-xl font-semibold">
                {word.exams}
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );

 
}

export default WordDetail