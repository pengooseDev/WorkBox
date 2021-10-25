/* 0. express 선언 및 포트 지정 */
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

//babel을 사용하므로 const express = require("express"); 를 위의 코드로 대체
const app = express();
const logger = morgan("dev");

/* 3. Route 지정 및 콜백함수(middleWare 넣어주기) */
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);

/* express로 form데이터 읽기 */
//req가 라우터로 들어가기 전에 처리되어야 하기 때문에 라우터보다 위에있음.
app.use(express.urlencoded({ extended: true }));

/* 5. Router 만들기 및 사용*/
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
/*4. middleWare 선언하기 */
//logger은 morgan()사용
//+a : Finalware은 next어차피 안쓰니 빼고 return에서 end()나 send() 써주면 res 종료.

/* 1. 포트 열기 */
//init.js로 옮김

export default app;
