// 모든 것을 초기화 시켜줌
// import 담당
import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = 4000;

// 외부 접속 listen
const handleListening = () =>
  console.log(`✅ Server Listening on port http://localhost:${PORT} 🔈`);

app.listen(PORT, handleListening); // 4000 포트 , handleListening callback
