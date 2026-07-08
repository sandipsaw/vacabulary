const UserProgress = require("../Model/userProgressModel");
const QuizAttempt = require("../Model/quizAttemptModel");

const getUserDashboard = async (req, res) => {
    try {



        const userId = req.user.id;

        const progress = await UserProgress
            .findOne({ user: userId })
            .lean();

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: "Progress not found"
            });
        }
        console.log({
            words: progress.totalWordsLearned,
            quiz: progress.totalQuizAttempted,
            streak: progress.currentStreak,
            accuracy: progress.accuracy
        });
        const achievements = [];

        const quizHistory = await QuizAttempt
            .find({ user: userId })
            .populate("quiz", "word questionType difficulty")
            .sort({ createdAt: -1 })
            .limit(10)
            .lean();

        if (progress.totalWordsLearned < 50 && progress.totalQuizAttempted < 50) {
            achievements.push("Vocabulary Beginner");
        }

        if (progress.currentStreak >= 7) {
            achievements.push("7 Day Streak");
        }

        if (progress.totalWordsLearned >= 100) {
            achievements.push("100 Words Learned");
        }

        if (
            progress.totalQuizAttempted >= 100 &&
            progress.accuracy >= 80
        ) {
            achievements.push("Quiz Master");
        }

        res.status(200).json({
            success: true,
            dashboard: {

                stats: {
                    totalWordsLearned: progress.totalWordsLearned,
                    totalQuizAttempted: progress.totalQuizAttempted,
                    averageScore: progress.averageScore,
                    accuracy: progress.accuracy
                },

                streak: {
                    currentStreak: progress.currentStreak,
                    longestStreak: progress.longestStreak,
                    lastQuizDate: progress.lastQuizDate
                },

                weeklyProgress: progress.weeklyProgress,

                recentActivity: progress.recentActivity,

                quizHistory: quizHistory,
                percentage: Number,
                achievements
            }
        });




    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = { getUserDashboard };