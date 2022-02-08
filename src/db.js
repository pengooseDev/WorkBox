import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL, {
    //Mongoose MongoDB 최신화
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () => {
    console.log("Connected to DB");
};

const handleError = (error) => console.log(`DB error : ${error}`);
//on은 발생할때마다 알려주고, once는 처음만 알려줌
db.on("error", handleError);
db.once("open", handleOpen);
