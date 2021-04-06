require('dotenv').config();

const express =require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.query());

app.get('/apikey', (req, res) => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_CONFIG_API_KEY,
    authDomain : process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
    projectId : process.env.FIREBASE_CONFIG_PROJECT_ID,
    storageBucket : process.env.FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId : process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId : process.env.FIREBASE_CONFIG_APP_ID,
    measurementId : process.env.FIREBASE_CONFIG_MEASUREMENT_ID,
  }

  const kakaoConfig = {
    apiKey: process.env.KAKAO_CONFIG_JAVASCRIPT_KEY
  };

  const naverConfig = {
    clientId: process.env.NAVER_CONFIG_CLIENT_ID,
    clientSecret: process.env.NAVER_CONFIG_CLIENT_SECRET,
    domain: process.env.NAVER_CONFIG_DOMAIN,
  }

  const config = {
    firebaseConfig,
    kakaoConfig,
    naverConfig,
  }

  res.json(config);
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/kakao', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'kakao.html'));
});

app.get('/naver', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'naver.html'));
});

app.get('/naver/callback', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'naver-callback.html'))
});

app.get('/google', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'google.html'));
});

app.get('/facebook', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'facebook.html'));
});

app.get('/apple', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'apple.html'));
});

app.listen(3000, () => {
  console.log('server start');
})