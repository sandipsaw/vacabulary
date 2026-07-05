import React from "react";
import { NavLink } from "react-router-dom";
import VocabCreaate from "../Pages/vocab/VocabCreate.jsx";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Vocab = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-10 text-4xl font-bold text-center">
          Vocabulary Sections
        </h1>

        {<VocabCreaate/>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {letters.map((letter) => (
            <NavLink
              key={letter}
              to={`/section/${letter}`}
              className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center transition duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:bg-indigo-600"
            >
              <h2 className="text-5xl font-bold">{letter}</h2>

              <p className="mt-3 text-slate-300">
                Section {letter}
              </p>
            </NavLink>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Vocab;