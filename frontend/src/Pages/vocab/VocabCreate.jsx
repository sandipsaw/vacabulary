import React from "react";
import { useForm } from "react-hook-form";

const VocabCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
            Admin Panel
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Create Vocabulary
          </h1>

          <p className="mt-2 text-slate-400">
            Add a new vocabulary word with examples, synonyms and hints.
          </p>
        </div>

        {/* Form Card */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-lg shadow-black/20">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >

            {/* Word */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Word
              </label>

              <input
                {...register("word", {
                  required: "Word is required",
                })}
                placeholder="Enter vocabulary word"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
              />

              <p className="mt-1 text-sm text-red-400">
                {errors.word?.message}
              </p>
            </div>

            {/* Synonyms */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Synonyms
              </label>

              <input
                {...register("synonyms")}
                placeholder="Happy, Cheerful, Joyful"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Example */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Example Sentence
              </label>

              <textarea
                rows="4"
                {...register("example")}
                placeholder="Write an example sentence..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Hint */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Hint
              </label>

              <textarea
                rows="3"
                {...register("hint")}
                placeholder="Give a memory trick or hint..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Image */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Upload Image
              </label>

              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="w-full rounded-xl border border-dashed border-slate-700 bg-slate-900 p-4 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-500"
              />
            </div>

            {/* Button */}

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500"
            >
              Create Vocabulary
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default VocabCreate;