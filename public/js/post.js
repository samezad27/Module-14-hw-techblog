const postHandler = async function (event) {
  event.preventDefault();

  const postTitle = document.querySelector("#post-id");
  const postBody = document.querySelector("#post-body");

  const response = await fetch("/api/post/", {
    method: "POST",
    body: JSON.stringify({
      title: postTitle.value,
      body: postBody.value,
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to Post");
  }
};

const updatePost = async function (event) {
  console.log(event.target.id, "this is the post id");
  const text = document.querySelector(`#body-${event.target.id}`).value;
  console.log("TEXT", text);
  const response = await fetch("/api/post/" + event.target.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      body: text,
    }),
  });
  console.log(response);
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to Delete");
  }
};

const deletePost = async function (event) {
  console.log(event.target.id, "this is the post id");

  const response = await fetch("/api/post/" + event.target.id, {
    method: "DELETE",

    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to Delete");
  }
};

Array.from(document.querySelectorAll(".update-btn")).forEach((element) =>
  element.addEventListener("click", updatePost)
);
Array.from(document.querySelectorAll(".delete-btn")).forEach((element) =>
  element.addEventListener("click", deletePost)
);

document.querySelector("#create-post").addEventListener("submit", postHandler);
