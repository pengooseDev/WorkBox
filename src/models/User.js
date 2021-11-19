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
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
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
