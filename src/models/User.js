import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 20,
    },
    avatarUrl: String,
    //소셜 로그인을 할 경우, 비밀번호를 생성하지 않기 때문에, 반드시 소셜로그인 True, false로 로그인체크
    socialOnly: { type: Number, default: false },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        maxlength: 20,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 10,
    },
    location: {
        type: String,
    },
});

userSchema.pre("save", async function () {
    //this === userSchema
    console.log(this.password);
    this.password = await bcrypt.hash(this.password, 5);
    console.log(this.password);
    //callback함수는 필요없음 async, await사용중이기 때문.
});

const User = mongoose.model("User", userSchema);
export default User;
