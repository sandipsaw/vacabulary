import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetWords } from "../Store/vocabAction";
import { FaBookOpen, FaMagic } from "react-icons/fa";

const Section = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { letter } = useParams();
  const Words = useSelector((state) => state.vocabReducers.words || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadWords = async () => {
      setIsLoading(true);
      await dispatch(asyncGetWords(letter));
      if (isMounted) {
        setIsLoading(false);
      }
    };

    loadWords();

    return () => {
      isMounted = false;
    };
  }, [dispatch, letter]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#111827,_#020617_70%)] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-indigo-400 hover:text-indigo-300"
          >
            <span className="mr-2 inline-block">←</span>
            Back to vocabulary
          </button>

          <div className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200">
            Explore letters with ease
          </div>
        </div>

        <div className="mb-8 rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_25px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-200">
                <FaBookOpen className="text-indigo-300" />
                Vocabulary Section
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Letter {letter}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                Discover a curated collection of words starting with this letter and learn them in a more engaging way.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <FaMagic className="text-amber-300" />
                <span>{Words.length} words available</span>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-[50vh] items-center justify-center rounded-[32px] border border-white/10 bg-slate-900/60 p-8 shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-indigo-400/20 border-t-indigo-400 animate-spin" />
              <div>
                <h2 className="text-xl font-semibold text-white">Loading words...</h2>
                <p className="mt-1 text-sm text-slate-400">Please wait while the section is being prepared.</p>
              </div>
            </div>
          </div>
        ) : Words.length === 0 ? (
          <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-10 text-center shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">No words found</h2>
            <p className="mt-2 text-slate-400">Try another letter or come back later.</p>
          </div>
        ) : (
          <div className="grid gap-4  sm:grid-cols-2 xl:grid-cols-4 ">
            {Words.map((word) => (
              <NavLink
                key={word._id}
                to={`/word/details/${word._id}`}
                className="group rounded-[24px] border border-white/10 bg-slate-900/70 p-5 shadow-[0_15px_50px_rgba(2,6,23,0.25)] transition duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-[0_20px_65px_rgba(99,102,241,0.25)]"
              >
                <div className="flex gap-4 items-center">
                  <div className="flex h-14 lg:w-15 md:w-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-2xl font-bold text-white shadow-lg shadow-indigo-500/20 transition group-hover:scale-105">
                    {word.letter}
                  </div>

                  <div className="">
                    <div className="flex justify-between">
                      <h2 className="text-2xl font-semibold text-white transition group-hover:text-indigo-300">
                        {word.word}
                      </h2>

                    </div>
                    <p className="mt-1 text-sm text-slate-400">
                      {word.definition? `${word.definition.slice(0, 32)}...`: "Definition not available yet."}
                    </p>
                  </div>

                </div>




              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;