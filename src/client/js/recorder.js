import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({
    log: true,
    corePath: "https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js",
  });
  await ffmpeg.load(); // 사용자가 소프트웨어를 사용할것이기 때문에 (소프트웨어가 무거울수 있기 때문에)

  // ffmpeg에 파일을 만들기
  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
  // ffmpeg 명령어 (ecording.webm를 input으로 받기)
  // 초당 60프레임으로 인코딩
  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

  // 특정시간으로 가서 스크린샷 한 장을 찍음
  await ffmpeg.run("-i","recording.webm","-ss","00:00:01","-frames:v","1","thumbnail.jpg");

  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  const thumbFile = ffmpeg.FS("readFile","thumbnail.jpg");

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer],{type:"image/jpg"});

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "MyRecording.mp4"; // 해당 URL을 다운로드하는 것
  document.body.appendChild(a);
  a.click();

  const thumbA = document.createElement("a");
  thumbA.href = thumbUrl;
  thumbA.download = "MyThumbnail.jpg"; // 해당 URL을 다운로드하는 것
  document.body.appendChild(thumbA);
  thumbA.click();
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    // 브라우저 메모리에서만 가능한 URL, 파일을 가리키고 있는 URL
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };

  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
