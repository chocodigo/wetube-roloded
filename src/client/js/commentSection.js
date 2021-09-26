const form = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer");

const handleSubmit = (event) => {
  event.preventDefault(); //   브라우저가 하는 동작을 항상 멈춤
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    body: {
      text,
    },
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
