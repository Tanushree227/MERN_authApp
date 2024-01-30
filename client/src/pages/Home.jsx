import { useEffect, useState } from "react";
import PostsList from "../components/posts/PostsLists";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPosts, setLoadedPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://mern-authapp-6f833-default-rtdb.firebaseio.com/posts.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        const posts = [];
        for(const key in data)
        {
            const post = {
                id: key,
                ...data[key]
            };
            posts.push(post);
        }
      setIsLoading(false);
      setLoadedPosts(posts);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading....</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Posts</h1>
      <PostsList posts={loadedPosts} />
    </section>
  );
}

export default Home;
