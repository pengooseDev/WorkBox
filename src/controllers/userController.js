import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
    const { name, username, email, password, password2, location } = req.body;
    const pageTitle = "Join";

    /* Confirm Password */
    if (password !== password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMassage: "Password confirmation does not match.",
        });
    }

    /* Confirm Duplicated */
    const exists = await User.exists({
        $or: [{ username }, { email }],
    });
    if (exists) {
        console.log("Username or E-mail is duplicated.");
        return res.status(400).render("join", {
            pageTitle,
            errorMassage: "This username/E-mail is already taken.",
        });
    }

    //아이디 길이, 비밀번호 길이따라 오류뜨는 것도 exists처럼 예외처리 해줘야함.
    try {
        await User.create({
            name,
            username,
            email,
            password,
            location,
        });
        return res.redirect("/login");
    } catch (error) {
        console.log(error);
        return res.status(400).redirect("/join", {
            pagetitle: "Join",
            errorMassage: error._massage,
        });
    }
};

export const edit = (req, res) => {
    return res.send("user - Edit Users");
};

export const remove = (req, res) => {
    return res.send("user - remove User");
};

/* Login */
export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const pageTitle = "Login";
    //check exists
    if (!user) {
        res.status(400).render("login", {
            pageTitle,
            errorMassage: "An account with this username doesn't exists",
        });
    }
    //check PW(compare with hashed input & hashed PW)
    /*아래처럼 하면 비번 하나라도 있으면 다 뚫림. 
    const hashedPW = await User.find({ password });

    const user = await User.FindOne({username})으로 User객체를 찾고 그걸로 비교하기. */
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        console.log("pw error");
        return res.status(400).render("login", {
            pageTitle,
            errorMassage: "Wrong ID/PW.",
        });
    }

    //로그인 성공
    /*1) user정보 세션에 담기.*/
    //(유저마다 서로 다른 req.session object를 가지고 있기 때문.)
    req.session.loggedIn = true;
    //const user = await User.findOne({ username });
    req.session.user = user;

    return res.redirect("/");
};

export const logout = (req, res) => {
    return res.send("user - logout");
};

export const see = (req, res) => {
    return res.send("user - see User/:id");
};
