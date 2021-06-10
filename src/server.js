import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;

const app = express(); //express application을 만듦
const logger = morgan("dev");
app.use(logger);

// application setting

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
// app.use() => global Middleware

// 외부 접속 listen
const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${PORT} 🔈`);

app.listen(PORT, handleListening); // 4000 포트 , handleListening callback
