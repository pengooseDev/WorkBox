/* Youtube 검색 API도 있지만 Iframe 사용하기. */
/* Youtube 검색 API도 있지만 Iframe 사용하기. */
/* Youtube 검색 API도 있지만 Iframe 사용하기. */
/* 1) google에서 "iframe 유튜브" 검색.
iframe에 사용할 영상 소스 링크 가져오는 것도 생각해야됨.
웹에서 검색했을 경우 그 값을 구글, 유튜브에서 검색해서
소스값 가져오는거 생각해보기. 아니면 그냥 야론처럼
DB구축해버려도 상관 없음. 
2) "유튜브 소스 생성기" 검색.
하나의 솔루션이 될 수 있을듯?*/

/* 0. express 선언 및 포트 지정 */
import express from "express";
import morgan from "morgan";
import session from "express-session"; //router앞에서 초기화.
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware, sessionMiddleware } from "./middlewares";

//babel을 사용하므로 const express = require("express"); 를 위의 코드로 대체
const app = express();
const logger = morgan("dev");

/* import로 사용하는 middleware는 전부 next()가 내장되어있는듯.
우리가 직접 만드는 middleware은 next()써줘야함. */

/* 3. Route 지정 및 콜백함수(middleWare 넣어주기) */
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);

/* express로 form데이터 읽기 */
//req가 라우터로 들어가기 전에 처리되어야 하기 때문에 라우터보다 위에있음.
app.use(express.urlencoded({ extended: true }));

/* Session - 반드시 Router 앞에서 사용. */
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        //MongoStore (세션은 하나의 옵션을 가지는데 그게 아래에 있는 store임. 몽고스토어로 설정하고 dburl연결.)
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL,
        }),
    })
);

/* locals Middleware - 이것 또한 Router 이전, Session 뒤에 사용 */
app.use(localsMiddleware, sessionMiddleware);

/* 5. Router 만들기 및 사용*/
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
/*4. middleWare 선언하기 */
//logger은 morgan()사용
//+a : Finalware은 next어차피 안쓰니 빼고 return에서 end()나 send() 써주면 res 종료.

/* 1. 포트 열기 */
//init.js로 옮김

export default app;
