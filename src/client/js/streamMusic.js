import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import ytdl from "ytdl-core";
import fs from "fs";

console.log("FFMEG!");
const videoData = ytdl("http://www.youtube.com/watch?v=aqz-KE-bpKQ").pipe(
    fs.createWriteStream("video.mp4")
);

const handleDownload = async (videoUrl) => {
    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    ffmpeg.FS("writeFile", "mp4name", await fetchFile(videoUrl));
    await ffmpeg.run("-i", "mp4name", "-r", "60", "ouput.mp4");
};
