import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import PostsList from "../components/posts/PostsLists";

function Favorites()
{
    const favoritesCtx = useContext(FavoritesContext);

    let content;

    if(favoritesCtx.totalFavorites === 0)
    {
        content = <p>Not Liked Posts yet? Do Like some posts</p>
    }
    else
    {
        content = <PostsList posts={favoritesCtx.favorites} />;
    }

    return(
        <section>
            <h1>Liked Posts</h1>
            {content}
        </section>
    );
}

export default Favorites;