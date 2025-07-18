// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// DB Connection
const connectDB = require('./config/db');
connectDB();

// Middleware
app.use(express.json());
// app.use(cors({ origin: true, credentials: true }));
app.use(
  cors({
    // origin: 'https://www.ronitrox.xyz',
    origin: (origin, callback) => {
      callback(null, origin || '*'); // allow all origins dynamically
    },
    credentials: true,
    exposedHeaders: ['Authorization'],
  })
);

app.use(cookieParser());

// Routes
// FOR LOGIN
const loginRoutes = require('./routes/LoginRoute');
app.use('/api/auth', loginRoutes);
// FOR VERIFY OTP
const verifyOtpRoutes = require('./routes/VerifyOtpRoute');
app.use('/api/auth', verifyOtpRoutes);
// FOR USER PROFILE
const userProfileRoutes = require('./routes/UserProfileRoute');
app.use('/api/auth', userProfileRoutes);
// FOR USER
const userRoutes = require('./routes/UserRoutes');
app.use('/api/user', userRoutes);
// FOR JOURNAL
const journalRoutes = require('./routes/JournalRoute');
app.use('/api/journal', journalRoutes);
// FOR PERSONALITY
const personalityRoutes = require('./routes/PersonalityRoute');
app.use('/api/personality', personalityRoutes);
// FOR CHAT
const chatRoutes = require('./routes/chatRoute');
app.use('/api/chat', chatRoutes);
// FOR PINECONE
const pineconeRoute = require('./routes/pineconeRoutes');
app.use('/api/pine', pineconeRoute);
// FOR ROUTINE
const routineRoutes = require('./routes/routineRoute');
app.use('/api/routine', routineRoutes);
// FOR GOAL
const goalRoutes = require('./routes/GoalRoutes');
app.use('/api/goal', goalRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
