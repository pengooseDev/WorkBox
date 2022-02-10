/* locals */
export const localsMiddleware = (req, res, next) => {
    /* res.locals와 req.session 같이 사용. */
    //req.session.loggedIn가 undefined일 수 있으니 Boolean선언.
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    //이제 위의 내용을 base 템플릿에 적용

    //전역변수 pageTitle
    res.locals.siteName = "Pengtube";

    //MongoDB에서 가져온 User객체 //await User.findOne({ username });
    res.locals.loggedInUser = req.session.user || {};
    next();
};

export const sessionMiddleware = (req, res, next) => {
    req.sessionStore.all((err, sessions) => {
        //console.log(sessions);
        //console.log(`sessionID : `, req.session.id)
        next();
    });
};

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/");
    }
};
