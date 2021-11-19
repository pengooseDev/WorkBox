import mongoose from "mongoose";

//model의 생김새를 알려줌 이를 schema라고 함.
//새로운 클래스 생성 후 데이터 형식 적어주기
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        minLength: 1,
        maxLength: 20,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200,
    },
    /* 매번 Schema를 만들고 설정하는 것이 번거롭기 때문에 
    아래에 default값을 이용해 Date.now로 설정 
    Date.now()를 해버리면 즉각 실행되서, 서버를 연 시점으로 고정되어버림.
    그래서 Date.now만 쳐두면 몽구스가 알아서 실행해줌
    */
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    },
});

videoSchema.static("formatHashtags", function (hashtags) {
    return hashtags
        .split(",")
        .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

//middleWare은 Schema가 생성되기 전에 만들어줘야함.
/*videoSchema.pre("save", async function () {
    this.hashtags = this.hashtags[0]
        .split(",")
        .map((word) => (word.startsWith("#") ? word : `#${word}`));
    console.log(`second : ${this.hashtags}`);
});*/

//const 여기 = mongoose.model("여기", 만든 스키마); <- '여기'의 이름은 항상 맞춰주는듯?
const Video = mongoose.model("Video", videoSchema);
export default Video;
