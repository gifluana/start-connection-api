import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import gameData from './gamedata.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet()); // Adds security headers

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests
});
app.use(limiter);

// CORS Configuration
app.use(cors({
    origin: 'https://lunazstudios.com', // Trusted domain
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'x-api-key'],
}));

// JSON Middleware
app.use(express.json());

// API Key Middleware
app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
});

// Game Routes
app.get('/start', (req, res) => {
    const firstStage = gameData[0];
    if (!firstStage) {
        return res.status(500).json({ error: 'Game data not found.' });
    }
    res.json({
        question: firstStage.question,
        title: firstStage.title || '[start connection]',
    });
});

app.post('/answers', (req, res) => {
    const { stage, playerAnswer } = req.body;

    if (typeof stage !== 'number' || typeof playerAnswer !== 'string') {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const currentStageData = gameData[stage];
    if (!currentStageData) {
        return res.status(404).json({ error: 'Stage not found' });
    }

    const answerKey = Object.keys(currentStageData.answers).find(answer =>
        playerAnswer.toLowerCase().includes(answer)
    );

    let response, nextStage, nextQuestion;

    if (answerKey) {
        ({ response, nextStage } = currentStageData.answers[answerKey]);
        nextQuestion = gameData[nextStage]?.question || null;
    } else {
        response = currentStageData.defaultAnswer;
        nextStage = currentStageData.acceptAnyInput
            ? currentStageData.nextStage
            : stage;
        nextQuestion = gameData[nextStage]?.question || null;
    }

    res.json({ response, nextStage, nextQuestion });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});