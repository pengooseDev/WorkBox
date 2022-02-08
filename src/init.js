import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

/* 1. 포트 열기 */
const PORT = 4001;
//listenhandler
const handleListening = () =>
    console.log(`Server listening on http://localhost:${PORT}`);
//listener
app.listen(PORT, handleListening);
