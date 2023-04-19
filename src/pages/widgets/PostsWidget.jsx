import { BACKEND_URL } from "constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`${BACKEND_URL}/posts/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
      getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          firstName,
          lastName,
          story,
          imagePath,
          comments,
          createdAt
        }) => (
          <PostWidget
            name={`${firstName} ${lastName}`}
            story={story}
            picturePath={imagePath}
            comments={comments}
            postId={_id}
            createdAt={createdAt}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
