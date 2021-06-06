import express from "express";

const PORT = 4000;

const app = express(); //express application을 만듦

// application setting

const gossipMiddleware = (req, res, next) => {
  console.log(`Someone is going to : ${req.url}`);
  next();
};

const handleHome = (req, res) => {
  return res.send("I love middlewares");
};

app.get("/", gossipMiddleware, handleHome); // "/"으로 get request를 하면 callback함수를 받는다.

// 외부 접속 listen
const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${PORT} 🔈`);

app.listen(PORT, handleListening); // 4000 포트 , handleListening callback
