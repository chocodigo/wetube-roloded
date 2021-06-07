import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express(); //express application을 만듦
const logger = morgan("dev");
app.use(logger);

// application setting

const globalRouter = express.Router(); // 홈에서 바로 갈 수 있는 페이지들
const userRouter = express.Router();
const videoRouter = express.Router();

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
// app.use() => global Middleware

// 외부 접속 listen
const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${PORT} 🔈`);

app.listen(PORT, handleListening); // 4000 포트 , handleListening callback
