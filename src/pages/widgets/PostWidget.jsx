import {
    ChatBubbleOutlineOutlined
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import Flex from "components/Flex";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  
  const PostWidget = ({
    name,
    story,
    picturePath,
    comments,
  }) => {
    const [isComments, setIsComments] = useState(false);
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
  
    return (
      <WidgetWrapper m="2rem 0">
        <Typography color={main} sx={{ mt: "1rem" }}>
          {story}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
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
  