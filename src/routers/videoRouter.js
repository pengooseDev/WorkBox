import express from "express";
import {
    watch,
    getEdit,
    postEdit,
    getUpload,
    postUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

/* upload가 id위에 있는 이유는 id가 숫자 뿐 아니라 string도 다 id로 인식함.
따라서 /videos/upload에 접속할 경우, /:id에도 해당해서 :id에서 return해버림.
따라서 업로드 페이지가 아니라 watch페이지가 나와버림.
그렇기 때문에 파라미터 접속 페이지는 else느낌으로 제일 아래에 넣어야함. */

//videoRouter.get("/:id(\\d+)", watch);랑 같은표현
videoRouter.get("/:id(\\d+)", watch);

//video/123/watch가 아닌 video/123 그 번호 자체가 Path임.
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

videoRouter.route("/upload").get(getUpload).post(postUpload);
export default videoRouter;
