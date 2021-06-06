import express from "express";

const PORT = 4000;

const app = express(); //express application을 만듦

// application setting

const handleHome = (req, res) => {
  return res.send("I still love you");
};

const handleLogin = (req, res) => {
  return res.send("Login here.");
};
app.get("/", handleHome); // "/"으로 get request를 하면 callback함수를 받는다.
app.get("/login", handleLogin);

// 외부 접속 listen
const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${PORT} 🔈`);

app.listen(PORT, handleListening); // 4000 포트 , handleListening callback
