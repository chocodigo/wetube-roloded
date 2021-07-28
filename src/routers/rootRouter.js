import express from "express";
import { home,search } from "../controllers/videoController";
import { getJoin,postJoin, login } from "../controllers/userController";

const rootRouter = express.Router(); // 홈에서 바로 갈 수 있는 페이지들

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
rootRouter.get("/search",search)

export default rootRouter;
