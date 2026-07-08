import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
import {asyncGetWords} from '../Store/vocabAction'
import { BiAddToQueue } from "react-icons/bi";
import { useSelector } from "react-redux";
const Vocab = () => {
  
  const dispatch=useDispatch()
  const userData = useSelector((state)=>state.userReducers.user)
  console.log(userData);
  const wordHandler = (letter)=>{
    console.log(letter);
    console.log("wordhandler");
    dispatch(asyncGetWords(letter))
}

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 relative">
      {userData.role == "admin" ? (<>
      <div className="absolute lg:block hidden lg:top-10 lg:right-10"><NavLink className="w-200 h-100 p-3 m-4 rounded-full px-5 border-1  font-bold text-indigo-600 bg-slate-900/80 hover:bg-indigo-600  hover:text-white" to="/vocab/create" >  Create Vocab</NavLink></div>
      <div className="fixed lg:hidden block bottom-10 right-5"><NavLink className="w-200 h-100 p-3 m-4 rounded-full px-5 border-1  font-bold text-indigo-600 bg-slate-900/80 hover:bg-indigo-600  hover:text-white" to="/vocab/create" >Create Vocab </NavLink></div>
      </>
    ): (<></>)}
      <div className="mx-auto max-w-7xl">

        
        <h1 className="mb-10 text-4xl font-bold text-center">
          Vocabulary Sections
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {letters.map((letter) => (
            <NavLink
            onClick={() => wordHandler(letter)}
            
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