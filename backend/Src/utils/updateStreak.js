const updateStreak = (progress) => {

    const today = new Date();

    const lastDate = progress.lastQuizDate;

    if (!lastDate) {

        progress.currentStreak = 1;

    } else {

        const diff = Math.floor(
            (today - lastDate) /
            (1000 * 60 * 60 * 24)
        );

        if (diff === 1) {

            progress.currentStreak++;

        } else if (diff > 1) {

            progress.currentStreak = 1;

        }
    }

    progress.lastQuizDate = today;

    if (progress.currentStreak > progress.longestStreak) {

        progress.longestStreak = progress.currentStreak;

    }
};

module.exports = updateStreak;