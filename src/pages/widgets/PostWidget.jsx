import {
    Edit, Save, Delete
  } from "@mui/icons-material";
  import { IconButton, Typography, useTheme, TextField } from "@mui/material";
  import Flex from "components/Flex";
  import WidgetWrapper from "components/WidgetWrapper";
  import { BACKEND_URL } from "constants";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost, setPosts } from "state";
  
  const PostWidget = ({
    postId,
    name,
    story,
    picturePath,
    comments
  }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [newStory, setNewStory] = useState(story);
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const onClickSave = async () => {
      const values = {
        'userId' : _id,
        'postId' : postId,
        'story' : newStory
      };
      const response = await fetch(`${BACKEND_URL}/posts/edit`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const posts = await response.json();
      dispatch(setPost({ postId: postId, post: posts }));
      setIsEdit(!isEdit);
    };

    const onClickDelete = async () => {
        const response = await fetch(`${BACKEND_URL}/posts/`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({'postId' : postId })
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));

        await fetch(`${BACKEND_URL}/assets/${picturePath}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        })
    };

    return (
      <WidgetWrapper m="2rem 0">
        {!isEdit && 
        <Flex mt="0.25rem">
          <Flex gap="1rem" marginLeft="auto">
              <IconButton onClick={() => {setIsEdit(!isEdit)}}>
                <Edit />
              </IconButton>
          </Flex>
          <Flex gap="1rem">
              <IconButton onClick={onClickDelete}>
                <Delete />
              </IconButton>
          </Flex>
        </Flex>
        }
        {isEdit && 
        <Flex gap="1.5rem">
        <TextField
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
          onChange={(e) => setNewStory(e.target.value)}
          value={newStory}
          defaultValue={newStory}
          variant="outlined"
          multiline = {true}
        />
        <Flex gap="0.3rem">
          <IconButton onClick={onClickSave}>
            <Save />
          </IconButton>
        </Flex>
      </Flex>
      }
        {!isEdit && <Typography color={main} sx={{ mt: "1rem" }}>
          {story}
        </Typography>}
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`${BACKEND_URL}/assets/${picturePath}`}
          />
        )}
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;
  