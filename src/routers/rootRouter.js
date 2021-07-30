import express from "express";
import { home,search } from "../controllers/videoController";
import { getJoin,postJoin, getLogin,postLogin } from "../controllers/userController";

const rootRouter = express.Router(); // 홈에서 바로 갈 수 있는 페이지들

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search",search)

export default rootRouter;
