/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PostsList from "../components/posts/PostsLists";

function MyPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const userName = currentUser.username;
  let content;

  useEffect(() => {
    setIsLoading(true);
    fetch("https://mern-authapp-6f833-default-rtdb.firebaseio.com/posts.json")
      .then((response) => response.json())
      .then((data) => {
        const posts = [];
        for (const key in data) {
          const post = {
            id: key,
            ...data[key],
          };
          if (post.name === userName) {
            posts.push(post);
          }
        }
        setLoadedPosts(posts);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (loadedPosts.length === 0) {
    content = <p>No Posts yet.</p>;
  } else {
    content = <PostsList posts={loadedPosts} />;
  }

  return (
    <section>
      <h1>My Posts</h1>
      {content}
    </section>
  );
}

export default MyPosts;
