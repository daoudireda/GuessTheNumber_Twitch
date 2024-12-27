import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import tmi from 'tmi.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ['Content-Type', 'Authorization', 'access_token'],
    credentials: true,
  }
});

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.use(express.static(join(__dirname, '../dist')));

const twitchClient = new tmi.Client({
  options: { debug: true },
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_BOT_TOKEN
  },
  channels: [process.env.TWITCH_CHANNEL]
});

let gameActive = false;
let targetNumber = null;
let numberRange = { min: 1, max: 100 };
const REDIRECT_URI = 'http://localhost:5173'
const CLIENT_ID = process.env.VITE_TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET

twitchClient.connect().catch(console.error);

twitchClient.on('message', (channel, tags, message, self) => {
  // Emit every chat message to the web interface
  io.emit('chatMessage', {
    id: uuidv4(),
    username: tags.username,
    message: message,
    isGuess: !isNaN(parseInt(message))
  });

  if (self || !gameActive) return;

  const guess = parseInt(message);
  if (isNaN(guess)) return;

  if (guess === targetNumber) {
    const winner = tags.username;
    twitchClient.say(channel, `@${winner} got it right! The number was ${targetNumber}!`);
    io.emit('gameWon', { winner, number: targetNumber });
    gameActive = false;
  } else {
    const hint = guess > targetNumber ? 'lower' : 'higher';
    twitchClient.say(channel, `@${tags.username} - Try ${hint}!`);
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.emit('gameState', { active: gameActive, range: numberRange });

  socket.on('startGame', (range) => {
    numberRange = range;
    gameActive = true;
    targetNumber = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    twitchClient.say(process.env.TWITCH_CHANNEL, 
      `New game started! Guess a number between ${range.min} and ${range.max}!`);
    io.emit('gameState', { active: true, range });
  });

  socket.on('stopGame', () => {
    gameActive = false;
    twitchClient.say(process.env.TWITCH_CHANNEL, 
      'Game stopped by the streamer!');
    io.emit('gameState', { active: false, range: numberRange });
  });
});


// Step 1: Exchange Authorization Code for Access Token
app.post('/auth/token', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error exchanging token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to exchange token' });
  }
});

// Step 2: Get User Info
app.get('/auth/user', async (req, res) => {
  const { access_token } = req.headers;

  try {
    const response = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Client-Id': CLIENT_ID,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});