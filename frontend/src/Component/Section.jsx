import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { asyncGetWords } from "../Store/vocabAction";


const Section = () => {
   


  const Words = useSelector((state) => state.vocab.words);

  console.log(Words);


  
  const { letter } = useParams();

  

 

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-indigo-700">
          Letter {letter}
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          {Words.length} Words Found
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Words.map((word) => (
          <NavLink
            key={word._id}
            to={`/word/details/${word._id}`}
            className="group rounded-3xl bg-white/70 backdrop-blur-lg shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2 border border-gray-200"
          >
            <div className="p-6">
              {/* Letter Badge */}
              <div className="flex justify-between items-center mb-5">
                <span className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition">
                  {word.letter}
                </span>

                <span className="text-sm text-gray-500 font-semibold">
                  #{word._id}
                </span>
              </div>

              {/* Word */}
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
               
                {word.word}
              </h2>

              <p className="text-gray-500 mt-3">
                Click to learn more →
              </p>
            </div>
          </NavLink>
        ))}
      </div>

      {/* Empty State */}
      {Words.length === 0 && (
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-500">
            No Words Found
          </h2>
        </div>
      )}
    </div>
  );
};

export default Section;