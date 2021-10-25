import Video from "../models/Video";
//mongoose Video Scehma가져오기

/* globalRouter */
export const home = async (req, res) => {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
};

/* videoRouter */
export const watch = (req, res) => {
    const id = req.params.id;
    return res.render("watch", {
        pageTitle: `Watching`,
    });
};

export const getEdit = (req, res) => {
    const id = req.params.id;
    return res.render("edit", { pageTitle: `Editing` });
};

export const postEdit = (req, res) => {
    const { id } = req.params;
    const editedTitle = req.body.title;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    console.log("getUpload");
    return res.render("upload", { pageTitle: `Upload Video` });
};

export const postUpload = async (req, res) => {
    /* 시간 코드 */
    const uploadYear = String(new Date()).slice(11, 15);
    const uploadMonth = String(new Date()).slice(4, 7);
    const uploadDay = String(new Date()).slice(8, 10);
    const uploadTime = String(new Date()).slice(16, 24);
    const uploadTimeReturn = `${uploadYear}.${uploadMonth}.${uploadDay} ${uploadTime}`;
    /* 시간 코드 끝 */

    const { title, description, hashtags } = req.body;
    await Video.create({
        title,
        description,
        createdAt: Date.now(),
        hashtags: hashtags.split(",").map((word) => `#${word}`),
        meta: {
            views: 0,
            rating: 0,
        },
    });
    /*
    아래의 코드(const video = new Video를 통해 생산하던 방식)는 await Video.create로 대체됨.
    const dbVideo = await video.save();
    save()는 promise를 return함. 
    따라서 DB에 data가 저장될 때까지, 시간을 기다리게 됨.
    */
    return res.redirect(`/`);
};
