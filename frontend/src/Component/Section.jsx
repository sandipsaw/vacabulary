import React from "react";
import { NavLink, useParams } from "react-router-dom";

const Section = () => {
  const words = [
    // A
    { id: 1, word: "Apple", letter: "A" },
    { id: 2, word: "Ability", letter: "A" },
    { id: 3, word: "Accept", letter: "A" },

    // B
    { id: 4, word: "Balance", letter: "B" },
    { id: 5, word: "Believe", letter: "B" },
    { id: 6, word: "Benefit", letter: "B" },

    // C
    { id: 7, word: "Culture", letter: "C" },
    { id: 8, word: "Create", letter: "C" },
    { id: 9, word: "Confidence", letter: "C" },

    // D
    { id: 10, word: "Dream", letter: "D" },
    { id: 11, word: "Discover", letter: "D" },
    { id: 12, word: "Develop", letter: "D" },

    // E
    { id: 13, word: "Energy", letter: "E" },
    { id: 14, word: "Effort", letter: "E" },
    { id: 15, word: "Education", letter: "E" },

    // F
    { id: 16, word: "Future", letter: "F" },
    { id: 17, word: "Freedom", letter: "F" },
    { id: 18, word: "Focus", letter: "F" },

    // G
    { id: 19, word: "Growth", letter: "G" },
    { id: 20, word: "Goal", letter: "G" },
    { id: 21, word: "Grace", letter: "G" },

    // H
    { id: 22, word: "Hope", letter: "H" },
    { id: 23, word: "Honor", letter: "H" },
    { id: 24, word: "Habit", letter: "H" },

    // I
    { id: 25, word: "Idea", letter: "I" },
    { id: 26, word: "Imagine", letter: "I" },
    { id: 27, word: "Improve", letter: "I" },

    // J
    { id: 28, word: "Journey", letter: "J" },
    { id: 29, word: "Justice", letter: "J" },
    { id: 30, word: "Joy", letter: "J" },

    // K
    { id: 31, word: "Knowledge", letter: "K" },
    { id: 32, word: "Kindness", letter: "K" },
    { id: 33, word: "Kingdom", letter: "K" },

    // L
    { id: 34, word: "Learning", letter: "L" },
    { id: 35, word: "Leader", letter: "L" },
    { id: 36, word: "Language", letter: "L" },

    // M
    { id: 37, word: "Motivation", letter: "M" },
    { id: 38, word: "Memory", letter: "M" },
    { id: 39, word: "Mind", letter: "M" },

    // N
    { id: 40, word: "Nature", letter: "N" },
    { id: 41, word: "Network", letter: "N" },
    { id: 42, word: "Noble", letter: "N" },

    // O
    { id: 43, word: "Opportunity", letter: "O" },
    { id: 44, word: "Open", letter: "O" },
    { id: 45, word: "Organize", letter: "O" },

    // P
    { id: 46, word: "Passion", letter: "P" },
    { id: 47, word: "Power", letter: "P" },
    { id: 48, word: "Practice", letter: "P" },

    // Q
    { id: 49, word: "Quality", letter: "Q" },
    { id: 50, word: "Question", letter: "Q" },
    { id: 51, word: "Quick", letter: "Q" },

    // R
    { id: 52, word: "Respect", letter: "R" },
    { id: 53, word: "Responsibility", letter: "R" },
    { id: 54, word: "Result", letter: "R" },

    // S
    { id: 55, word: "Success", letter: "S" },
    { id: 56, word: "Strength", letter: "S" },
    { id: 57, word: "Skill", letter: "S" },

    // T
    { id: 58, word: "Talent", letter: "T" },
    { id: 59, word: "Trust", letter: "T" },
    { id: 60, word: "Team", letter: "T" },

    // U
    { id: 61, word: "Unity", letter: "U" },
    { id: 62, word: "Unique", letter: "U" },
    { id: 63, word: "Understand", letter: "U" },

    // V
    { id: 64, word: "Victory", letter: "V" },
    { id: 65, word: "Value", letter: "V" },
    { id: 66, word: "Vision", letter: "V" },

    // W
    { id: 67, word: "Wisdom", letter: "W" },
    { id: 68, word: "Welcome", letter: "W" },
    { id: 69, word: "Wonder", letter: "W" },

    // X
    { id: 70, word: "Xylophone", letter: "X" },
    { id: 71, word: "Xenon", letter: "X" },
    { id: 72, word: "Xerox", letter: "X" },

    // Y
    { id: 73, word: "Youth", letter: "Y" },
    { id: 74, word: "Yearn", letter: "Y" },
    { id: 75, word: "Yield", letter: "Y" },

    // Z
    { id: 76, word: "Zeal", letter: "Z" },
    { id: 77, word: "Zebra", letter: "Z" },
    { id: 78, word: "Zone", letter: "Z" },
  ];

  const { letter } = useParams();

  return (
    <div>
      {words.map((word) => {
        if (word.letter === letter) {
          return (
            <NavLink
              to={`/word/${word.word}`}
              key={word.id}
              className="text-center mt-10"
            >
              <h1 className="text-4xl font-bold">{word.word}</h1>
              <h1>{word.id}</h1>
            </NavLink>
          );
        }
      })}
    </div>
  );
};

export default Section;
