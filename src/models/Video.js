import mongoose from "mongoose";
//model의 생김새를 알려줌 이를 schema라고 함.

//새로운 클래스 생성 후 데이터 형식 적어주기
const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: String,
    hashtags: [{ type: String }],
    meta: {
        views: Number,
        rating: Number,
    },
});

//const 여기 = mongoose.model("여기", 만든 스키마); <- '여기'의 이름은 항상 맞춰주는듯?

const Video = mongoose.model("Video", videoSchema);
export default Video;
