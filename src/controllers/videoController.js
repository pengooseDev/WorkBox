import Video from "../models/Video";
//mongoose Video Scehma가져오기

/* globalRouter */
export const home = async (req, res) => {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    return res.render("home", { pageTitle: "Home", videos });
};

/* videoRouter */
export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found" });
    }

    return res.render("watch", {
        pageTitle: video.title,
        video,
    });
};

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", { pageTitle: "Video not found" });
    }
    return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id }); //비디오 있는지 찾기
    if (!video) {
        return res.render("404", { pageTitle: "Video not found" });
    }

    //있으면 새 정보 저장 => Video.findByIdAndUpdate(id, 업데이트 할 내용)
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: `Upload Video` });
};

export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
            meta: {
                views: 0,
                rating: 0,
            },
        });
    } catch (error) {
        return res.render("upload", {
            pageTitle: `Upload Video`,
            errorMessage: error._message,
        });
    }

    //여기서 await을 사용했기 때문에 Video.create에서 류가 발생하면 다음 코드로 안넘어감.
    //따라서 예외처리를 해줘야함.

    return res.redirect(`/`);
    /*
    아래의 코드(const video = new Video를 통해 생산하던 방식)는 await Video.create로 대체됨.
    const dbVideo = await video.save();
    save()는 promise를 return함. 
    따라서 DB에 data가 저장될 때까지, 시간을 기다리게 됨.
    */
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    console.log(id);
    return res.redirect("/");
};

export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i"),
            },
        });
    }
    res.render("search", { pageTitle: "Search", videos });
};
