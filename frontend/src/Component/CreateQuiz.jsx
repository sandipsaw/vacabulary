import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const questionTypes = [
  { value: "meaning", label: "Meaning" },
  { value: "synonym", label: "Synonym" },
  { value: "antonym", label: "Antonym" },
  { value: "fill_blank", label: "Fill in the Blank" },
  { value: "sentence", label: "Sentence" },
  { value: "spelling", label: "Spelling" },
  { value: "context", label: "Context" },
];

const difficulties = ["Easy", "Medium", "Hard"];

const CreateQuiz = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vocab: "",
      questionType: "meaning",
      question: "",
      options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
      correctAnswer: 0,
      explanation: "",
      difficulty: "Easy",
      marks: 1,
      negativeMarks: 0,
      isActive: true,
    },
  });

  const values = watch();

  const onSubmit = (data) => {
    console.log("Quiz data:", data);
    alert("Quiz created successfully!");
    reset();
    navigate('/quiz')
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.2),_transparent_30%),linear-gradient(135deg,_#020617,_#0f172a)] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300">
              Quiz Builder
            </p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              Create a polished quiz question
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
              Design meaningful vocabulary questions with rich options, difficulty levels, and scoring details in one attractive form.
            </p>
          </div>

          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-200 shadow-lg shadow-indigo-950/40">
            <p className="font-semibold">Live Preview Enabled</p>
            <p className="mt-1 text-indigo-300/80">Your quiz summary updates as you type</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.7fr]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8"
          >
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Question Details</h2>
                  <p className="text-sm text-slate-400">Capture the core quiz metadata.</p>
                </div>
                <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                  Required fields
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Vocab Reference
                  </label>
                  <input
                    {...register("vocab", { required: "Vocab reference is required" })}
                    placeholder="Enter vocab ID"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                  />
                  {errors.vocab && <p className="mt-1 text-sm text-red-400">{errors.vocab.message}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Question Type
                  </label>
                  <select
                    {...register("questionType", { required: "Question type is required" })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                  >
                    {questionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Question
                </label>
                <textarea
                  rows="3"
                  {...register("question", { required: "Question is required" })}
                  placeholder="Write the quiz question here"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                />
                {errors.question && <p className="mt-1 text-sm text-red-400">{errors.question.message}</p>}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Answer Choices</h2>
                  <p className="text-sm text-slate-400">Provide four options and mark the correct one.</p>
                </div>
                <div className="rounded-full bg-fuchsia-500/10 px-3 py-1 text-sm text-fuchsia-300">
                  4 options
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index}>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Option {index + 1}
                    </label>
                    <input
                      {...register(`options.${index}.text`, {
                        required: "Option text is required",
                      })}
                      placeholder={`Enter option ${index + 1}`}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Correct Answer
                  </label>
                  <select
                    {...register("correctAnswer", { required: "Correct answer is required" })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                  >
                    {[0, 1, 2, 3].map((num) => (
                      <option key={num} value={num}>
                        Option {num + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Explanation
                  </label>
                  <textarea
                    rows="3"
                    {...register("explanation", { required: "Explanation is required" })}
                    placeholder="Explain why this answer is correct"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Scoring & Status</h2>
                <p className="text-sm text-slate-400">Fine-tune quiz difficulty and grading behavior.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Difficulty
                  </label>
                  <select
                    {...register("difficulty")}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                  >
                    {difficulties.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Marks
                  </label>
                  <input
                    type="number"
                    min="1"
                    {...register("marks")}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Negative Marks
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    {...register("negativeMarks")}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                  />
                </div>
              </div>

              <label className="mt-5 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-300">
                <input type="checkbox" {...register("isActive")} className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-indigo-500" />
                Make this quiz active for learners
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-3 font-semibold text-white transition hover:from-indigo-500 hover:to-fuchsia-500"
            >
              Create Quiz
            </button>
          </form>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Live Preview
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">Quiz Snapshot</h3>
                </div>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-300">
                  {values.difficulty || "Easy"}
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Question Type</p>
                  <p className="mt-1 font-semibold text-white">{values.questionType || "meaning"}</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Question</p>
                  <p className="mt-1 text-sm text-slate-200">
                    {values.question || "Your question will appear here..."}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Options</p>
                  <div className="mt-2 space-y-2">
                    {values.options?.map((option, index) => (
                      <div key={index} className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300">
                        {option?.text || `Option ${index + 1}`}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <p className="text-sm text-slate-400">Correct Answer</p>
                    <p className="mt-1 font-semibold text-emerald-300">Option {Number(values.correctAnswer ?? 0) + 1}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <p className="text-sm text-slate-400">Scoring</p>
                    <p className="mt-1 font-semibold text-indigo-300">{values.marks ?? 1} mark / {values.negativeMarks ?? 0} negative</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;