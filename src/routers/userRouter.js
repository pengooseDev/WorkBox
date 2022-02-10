import express from "express";
import {
    getEdit,
    see,
    logout,
    startGithubLogin,
    finishGithubLogin,
    postEdit,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/logout", logout);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;
