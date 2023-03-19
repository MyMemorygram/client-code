import {
    Edit, Save, Delete
  } from "@mui/icons-material";
  import { IconButton, Typography, useTheme, InputBase } from "@mui/material";
  import Flex from "components/Flex";
  import WidgetWrapper from "components/WidgetWrapper";
  import { BACKEND_URL } from "constants";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost, setPosts, setNewStory } from "state";
  
  const PostWidget = ({
    postId,
    name,
    story,
    picturePath,
    comments
  }) => {
    const [isEdit, setIsEdit] = useState(false);
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const dispatch = useDispatch();
    const onChangeStory = (event) => {
      dispatch(setNewStory({newStory: event.target.value}));
    };
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const { newStory } = useSelector((state) => state.misc);

    const onClickSave = async () => {
      if(newStory !== "") {
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
      dispatch(setNewStory({newStory: ""}));
      }
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
    };

    return (
      <WidgetWrapper m="2rem 0">
        {!isEdit && 
        <Flex mt="0.25rem">
          <Flex gap="1rem" marginLeft="auto">
              <IconButton onClick={() => setIsEdit(!isEdit)}>
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
        <InputBase
          defaultValue={story}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
          onChange={onChangeStory}
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
  