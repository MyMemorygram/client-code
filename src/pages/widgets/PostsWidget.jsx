import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts/myPosts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      body: {"userId": userId}
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

//   const getUserPosts = async () => {
//     const response = await fetch(
//       `http://localhost:3001/posts/${userId}/posts`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     const data = await response.json();
//     dispatch(setPosts({ posts: data }));
//   };

  useEffect(() => {
      getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {!posts && posts.map(
        ({
          firstName,
          lastName,
          story,
          imagePath,
          comments,
        }) => (
          <PostWidget
            name={`${firstName} ${lastName}`}
            story={story}
            picturePath={imagePath}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
