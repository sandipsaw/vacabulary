import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetWordById } from "../Store/vocabAction";
import {
  FaBook,
  FaLightbulb,
  FaQuoteLeft,
  FaTags,
  FaGraduationCap,
} from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";

const WordDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetWordById(id));
  }, [dispatch, id]);

  const word = useSelector((state) => state.vocabReducers.SingleWord);

  const renderTagList = (items, fallback, baseClass) => {
    if (!items || (Array.isArray(items) && items.length === 0)) {
      return <p className="text-sm text-slate-400">{fallback}</p>;
    }

    const list = Array.isArray(items) ? items : [items];

    return (
      <div className="flex flex-wrap gap-2.5">
        {list.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`rounded-full px-3.5 py-2 text-sm font-medium ${baseClass}`}
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  if (!word) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#111827,_#020617_70%)] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center rounded-[32px] border border-white/10 bg-slate-900/70 p-8 shadow-[0_25px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-indigo-500/30" />
            <h1 className="text-2xl font-semibold text-white">Loading word details...</h1>
            <p className="mt-2 text-sm text-slate-400">Preparing a rich vocabulary view for you.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#111827,_#020617_70%)] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-indigo-400 hover:text-indigo-300"
          >
            ← Back to vocabulary
          </button>

          <div className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200">
            Vocabulary Explorer
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_25px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="flex flex-row gap-6 lg:flex-row lg:items-center lg:justify-between justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-200">
                <FaBook className="text-indigo-300" />
                Word of the Day
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {word.word}
              </h1>
              <p className="mt-3 text-lg text-slate-300">
                {word.pos || "Part of speech not available"}
              </p>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
                {word.definition || "A clear and concise definition will appear here once available."}
              </p>
            </div>

            <div className="flex items-center justify-center rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 via-slate-800 to-slate-900 p-6 shadow-inner">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500 text-3xl font-bold text-white shadow-lg shadow-indigo-500/20">
                {word.letter || word.word?.charAt(0)?.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-indigo-500/15 p-3 text-indigo-300">
                <FaBook />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Definition</h2>
                <p className="text-sm text-slate-400">Meaning and context</p>
              </div>
            </div>
            <p className="leading-8 text-slate-300">
              {word.definition || "Definition not available yet."}
            </p>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-amber-500/15 p-3 text-amber-300">
                <FaQuoteLeft />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Example Sentences</h2>
                <p className="text-sm text-slate-400">See it in action</p>
              </div>
            </div>
            {Array.isArray(word.examples) && word.examples.length > 0 ? (
              <ul className="space-y-3">
                {word.examples.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="rounded-2xl border border-white/10 bg-slate-800/70 p-4 text-sm leading-7 text-slate-300"
                  >
                    “{item}”
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">Example usage will appear here soon.</p>
            )}
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
                <TbArrowsExchange />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Synonyms</h2>
                <p className="text-sm text-slate-400">Related words</p>
              </div>
            </div>
            {renderTagList(word.synonyms, "No synonyms listed yet.", "bg-emerald-500/15 text-emerald-200")}
          </section>

          <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-rose-500/15 p-3 text-rose-300">
                <FaTags />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Antonyms</h2>
                <p className="text-sm text-slate-400">Opposite meanings</p>
              </div>
            </div>
            {renderTagList(word.antonyms, "No antonyms listed yet.", "bg-rose-500/15 text-rose-200")}
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-yellow-500/15 p-3 text-yellow-300">
                <FaLightbulb />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Memory Hint</h2>
                <p className="text-sm text-slate-400">A quick cue to remember it</p>
              </div>
            </div>
            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-500/10 p-4 text-sm leading-7 text-slate-300">
              {word.hint || "Add a memorable hint to make this word stick."}
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-500/15 p-3 text-cyan-300">
                <MdOutlineSchool />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Asked in Exams</h2>
                <p className="text-sm text-slate-400">Common academic references</p>
              </div>
            </div>
            {renderTagList(word.exams, "This word has no exam tags yet.", "bg-cyan-500/15 text-cyan-200")}
          </section>
        </div>
      </div>
    </div>
  );
};

export default WordDetail;