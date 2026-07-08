const QuizAttempt = require("../Model/quizAttemptModel");
const UserProgress = require("../Model/userProgressModel");
const LearnedWord = require('../Model/learnWordModel')

const updateStreak = require('../utils/updateStreak')

const createQuizAttempt = async (req, res) => {

    try {

        const userId = req.user.id;

        const {
            quiz,
            totalQuestions,
            correctAnswers,
            wrongAnswers,
            score,
            timeTaken,
            words,
            weakword,
            saveword
        } = req.body;

        const accuracy =
            totalQuestions === 0
                ? 0
                : Number(
                    ((correctAnswers / totalQuestions) * 100)
                        .toFixed(2)
                );

        let todayLearnedWords = 0;
        for (const wordId of words) {

            const result = await LearnedWord.updateOne(
                {
                    user: userId,
                    word: wordId
                },
                {
                    $setOnInsert: {
                        user: userId,
                        word: wordId
                    }
                },
                {
                    upsert: true
                }
            );

            if (result.upsertedCount > 0) {
                todayLearnedWords++;
            }
        }

        // Save Quiz Attempt
        const quizAttempt = await QuizAttempt.create({
            user: userId,
            quiz,
            totalQuestions,
            correctAnswers,
            wrongAnswers,
            score,
            accuracy,
            timeTaken,
            words,
            weakword,
            saveword
        });

        // Update User Progress
        let progress = await UserProgress.findOne({ user: userId });

        if (!progress) {
            progress = await UserProgress.create({
                user: userId
            });
        }
        updateStreak(progress)

        const oldAttempts = progress.totalQuizAttempted;

        progress.averageScore = Number(
            (
                (progress.averageScore * oldAttempts + score) /
                (oldAttempts + 1)
            ).toFixed(2)
        );

        progress.accuracy =
            ((progress.accuracy * oldAttempts + accuracy) /
                (oldAttempts + 1)).toFixed(2)

        progress.totalQuizAttempted += 1;

        progress.totalWordsLearned = await LearnedWord.countDocuments({
            user: userId
        });

        // Weekly Progress
        const today = new Date().toISOString().split("T")[0];

        const existingDay = progress.weeklyProgress.find(item =>
            item.date.toISOString().split("T")[0] === today
        );

        if (existingDay) {

            existingDay.quizzes += 1;
            existingDay.score += score;
            existingDay.learnedWords += todayLearnedWords;
        } else {

            progress.weeklyProgress.push({
                date: new Date(),
                quizzes: 1,
                score: score,
                learnedWords: todayLearnedWords

            });

        }

        // Keep only last 7 days
        progress.weeklyProgress.sort((a, b) => a.date - b.date);

        if (progress.weeklyProgress.length > 7) {
            progress.weeklyProgress = progress.weeklyProgress.slice(-7);
        }

        // Recent Activity
        progress.recentActivity.unshift({
            activity: `Completed Quiz`,
            createdAt: new Date()
        });

        if (progress.recentActivity.length > 20) {
            progress.recentActivity.pop();
        }

        await progress.save();

        res.status(201).json({
            success: true,
            message: "Quiz submitted successfully",
            quizAttempt,
            progress
        });

        

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = { createQuizAttempt };