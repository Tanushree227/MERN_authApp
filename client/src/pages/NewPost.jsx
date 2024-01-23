import NewPostForm from "../components/posts/NewPostForm";
import { useNavigate } from 'react-router-dom';

function NewPost() {
    const navigate = useNavigate();

  function addPostHandler(postData) {
    fetch("https://mern-authapp-6f833-default-rtdb.firebaseio.com/posts.json", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json",
      },
    }.then(() => {
        navigate('/');
    }));
  }

  return (
    <section>
      <h1 className="p-3">Add New Post</h1>
      <NewPostForm onAddPost={addPostHandler} />
    </section>
  );
}

export default NewPost;