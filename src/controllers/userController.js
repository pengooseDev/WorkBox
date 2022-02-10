import User from "../models/User";
import fetch from "node-fetch";
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

export const getEdit = (req, res) => {
    return res.render("edit-profile", { pageTktle: "Edit Profile" });
};

export const postEdit = (req, res) => {
    return res.render("edit-profile");
};

/* Login */
export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, socialOnly: false });
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
    req.session.destroy(); //세션 만료만 하면 됨. 겁나 간단하네.
    //(세션에 담긴 loggedIn = true도 날라감. false처리됨.)
    return res.redirect("/");
};

export const see = (req, res) => {
    return res.send("user - see User/:id");
};

//깃허브 인증 순서
//1. https://github.com/login/oauth/authorize?파라미터 로 redirect를 통한 원하는 정보 요청.
//2. 그럼 유저에게 연동 인증창이 뜸. 거기서 OK를 누르면 우리가 깃헙에서 설정한 /github/finish로 GET요청을 보내게됨.
//3. 그럼 유저는 우리가 설정한 url에 추가적인 query가 담긴 url로 GET을하게되는됨.
//4. 그 url은 code()
//
//
export const startGithubLogin = (req, res) => {
    //1. https://github.com/login/oauth/authorize?파라미터 로 redirect를 통한 원하는 정보 요청.
    //?client_id=d0d25e86e29eb36d52ce&allow_signup=true&scope=read:user user:email
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false, //연동 페이지에서 회원가입 가능하게 할 건지 여부
        scope: "read:user user:email", //요청할 정보는 전부 scope에 작성해야함.
        //여기에 해당하는 access_token을 발급하기 때문.
    };
    const params = new URLSearchParams(config).toString();
    const returnUrl = `${baseUrl}?${params}`;

    return res.redirect(returnUrl);
    //2. 위 url에 GET요청시 유저에게 연동 인증창이 뜸.
    //여기서 OK를 누르면 우리가 깃헙에서 설정한 /github/finish로 GET요청을 보내게됨.
};

export const finishGithubLogin = async (req, res) => {
    //3. GET요청을 받고 이 함수가 실행되면,
    //우리가 설정한 url에 추가적인 query가 달리게됨. 이 쿼리는 access_token을 위한 code를 담고있음.

    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const returnUrl = `${baseUrl}?${params}`;
    //그 쿼리를 뽑아서 url을 만들어 fetch를 이용해 POST요청을 깃헙 access_token 발급 페이지로 보냄
    //baseUrl = "https://github.com/login/oauth/access_token"
    const tokenRequest = await (
        await fetch(returnUrl, {
            //디폴트는 "GET"이며 POST요청일 때만 method: "POST" 작성
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
    ).json();
    console.log(`token : `, tokenRequest);
    if ("access_token" in tokenRequest) {
        //access_token을 발급받았다면 아래의 코드가 실행됨.
        //접근토큰을 넣어서 fetch를 통해 GET요청을 보낸다면 userRequest에 요청한 정보들이 담기게됨!
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";

        //User에 대한 정보를 req하고 그 return값이 userData에 담기게됨
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                //*header가 아닌 headers다!!! */
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();

        //Email에 대한 정보를 req하고 그 return값이 emailData에 담기게됨
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                //*header가 아닌 headers다!!! */
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        console.log(userData);
        console.log(emailData);
        //이제 깃헙에서 받은 Data(리스트로 return되어있음)들 중 원하는 정보 뽑아내기.
        //나는 인증되었고 primary한 email들만 뽑고싶음? 아래의 코드. 이 방식은 자주 쓰일테니 익히기.
        // 리스트.find(i=>코드)라는 find메서드는 for문처럼 리스트의 인자들을 하나하나 코드에 대입해 조건에 맞는 것들만 Object로 return해줌.
        const emailObj = emailData.find(
            (i) => i.primary === true && i.verified === true
        );
        if (!emailObj) {
            console.log("Email don't exist");
            //조건에 맞는 이메일 없으면 다시 로그인페이지로 redirect
            return res.redirect("/login");
        }
        //일반 회원가입 후, 다른 소셜 회원가입으로 또 회원가입하는 경우 아래와 같이 처리.
        //(회원가입 플랫폼은 다르지만, 동일한 이메일로 가입하는 경우)
        let existingUser = await User.findOne({ email: emailObj.email });
        if (!existingUser) {
            const user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name ? userData.name : userData.login, //이름 설정 안한경우 login으로 이름설정.
                username: userData.login,
                email: emailObj.email,
                //password: 패스워드는 존재하지 않음. 소셜로그인 했으니까.
                //대신 아래의 것을 사용.
                password: "",
                socialOnly: true,
                location: userData.location,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        //access_token 발급 실패할 경우
        return res.redirect("/login");
    }
};
