/* eslint-disable react/prop-types */
import PostItem from "./PostItem";
import classes from "./PostList.module.css";

function PostsList(props) {
  return (
    <ul className={classes.list}>
      {props.posts.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          image={post.image}
          title={post.title}
          name={post.name}
          description={post.description}
        />
      ))}
    </ul>
  );
}

export default PostsList;
