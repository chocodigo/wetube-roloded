import express from "express";

const PORT = 4000;

const app = express(); //express application을 만듦

const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${PORT} 🔈`);

app.listen(PORT, handleListening); // 4000 포트 , handleListening callback
