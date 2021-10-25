export const join = (req, res, nesxt) => {
    return res.send("Home - join");
};

export const edit = (req, res) => {
    return res.send("user - Edit Users");
};

export const remove = (req, res) => {
    return res.send("user - remove User");
};

export const login = (req, res) => {
    return res.send("user - login");
};

export const logout = (req, res) => {
    return res.send("user - logout");
};

export const see = (req, res) => {
    return res.send("user - see User/:id");
};
