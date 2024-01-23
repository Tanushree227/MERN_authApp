import NewPostForm from "../components/posts/NewPostForm";

function NewPost() {
  function addPostHandler(postData) {
    fetch("https://mern-authapp-6f833-default-rtdb.firebaseio.com/posts.json", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  return (
    <section>
      <h1 className="p-3">Add New Post</h1>
      <NewPostForm onAddPost={addPostHandler} />
    </section>
  );
}

export default NewPost;