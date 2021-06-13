import express from "express";
import { trending, search } from "../controllers/videoController";
import { join, login } from "../controllers/userController";

const globalRouter = express.Router(); // 홈에서 바로 갈 수 있는 페이지들

globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
