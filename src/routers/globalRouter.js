import express from "express";
import { home } from "../controllers/videoController";
import { join, login } from "../controllers/userController";

const globalRouter = express.Router(); // 홈에서 바로 갈 수 있는 페이지들

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
