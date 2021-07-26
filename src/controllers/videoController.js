import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    // (searchTerm, callback)
    // searchTerm == {} : 모든 형식을 찾는다는 것을 뜻함

    const videos = await Video.find({});

    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.render("server-error", { error });
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) return res.render("404", { pageTitle: "Video not found." });
  return res.render("watch", { pageTitle: video.title, video });
};

// form을 화면에 보여줌
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) return res.render("404", { pageTitle: "Video not found." });

  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

// 변경사항을 저장해줌
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  // object video
  const video = await Video.exists({ _id: id });
  if (!video) return res.render("404", { pageTitle: "Video not found." });
  // model Video
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`)),
  });

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  // here we will add a video to the videos array.
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,

      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
