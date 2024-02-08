import { useEffect, useState } from "react";
import PostsList from "../components/posts/PostsLists";
import classes from "./Home.module.css";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://mern-authapp-6f833-default-rtdb.firebaseio.com/posts.json")
      .then((response) => response.json())
      .then((data) => {
        const posts = [];
        const uniqueCategories = new Set();
        for (const key in data) {
          const post = {
            id: key,
            ...data[key],
          };
          posts.push(post);
          uniqueCategories.add(post.category);
        }

        setIsLoading(false);
        setLoadedPosts(posts);
        setCategories(Array.from(uniqueCategories)); // Convert Set to array
      });
  }, []);

  // Function to handle sorting based on selected option
  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortBy(selectedOption);

    let sortedPosts = [...loadedPosts];
    if (selectedOption === "title") {
      sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedOption === "name") {
      sortedPosts.sort((a, b) => a.name.localeCompare(b.name));
    }

    setLoadedPosts(sortedPosts);
  };

  // Function to handle category selection
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
  };

  // Function to filter posts based on selected category
  const filteredPosts = selectedCategory
    ? loadedPosts.filter((post) => post.category === selectedCategory)
    : loadedPosts;

  if (isLoading) {
    return (
      <section>
        <p data-testid="loading">Loading....</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Posts</h1>
      <div className={classes.container}>
        <div className={classes.sortByContainer}>
          <h3>Sort By: </h3>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="">Select one</option>
            <option value="title">Title</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className={classes.sortByContainer}>
          <h3>Select Category: </h3>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <PostsList data-testid="post-item" posts={filteredPosts} />
    </section>
  );
}

export default Home;
