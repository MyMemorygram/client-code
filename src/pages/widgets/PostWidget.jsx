import {
    ChatBubbleOutlineOutlined, Edit, Save
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme, InputBase } from "@mui/material";
  import Flex from "components/Flex";
  import WidgetWrapper from "components/WidgetWrapper";
  import { BACKEND_URL } from "constants";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost, setNewStory } from "state";
  
  const PostWidget = ({
    postId,
    name,
    story,
    picturePath,
    comments
  }) => {
    const [isComments, setIsComments] = useState(false);
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

    return (
      <WidgetWrapper m="2rem 0">
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
          <Typography>Save</Typography>
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
        <Flex mt="0.25rem">
          <Flex gap="1rem">
            <Flex gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </Flex>
          </Flex>
          <Flex gap="1rem">
            <Flex gap="0.3rem">
              <IconButton onClick={() => setIsEdit(!isEdit)}>
                <Edit />
              </IconButton>
              <Typography>Edit</Typography>
            </Flex>
          </Flex>
        </Flex>
        {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;
  