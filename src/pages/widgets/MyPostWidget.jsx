import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import InputEmoji from "react-input-emoji";
  import Flex from "components/Flex";
  import Dropzone from "react-dropzone";
  import UserProfileImage from "components/UserProfileImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "state";
  import { BACKEND_URL } from "constants";
  
  const MyPostWidget = ({ profilePicturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  
    const handlePost = async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("story", post);
      if (image) {
        formData.append("memoryPicture", image);
        formData.append("imagePath", image.name);
      }
  
      const response = await fetch(`${BACKEND_URL}/posts/savePost`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    };
  
    return (
      <WidgetWrapper>
        <Flex gap="1.5rem">
          <UserProfileImage image={profilePicturePath} />
          <InputEmoji 
            placeholder="Post new memorable picture and story..."
            onChange={setPost}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </Flex>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <Flex>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <Flex>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </Flex>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </Flex>
              )}
            </Dropzone>
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <Flex>
          <Flex gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </Flex>
  
          {isNonMobileScreens ? (
            <>
              <Flex gap="0.25rem">
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Clip</Typography>
              </Flex>
  
              <Flex gap="0.25rem">
                <AttachFileOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Attachment</Typography>
              </Flex>
  
              <Flex gap="0.25rem">
                <MicOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Audio</Typography>
              </Flex>
            </>
          ) : (
            <Flex gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </Flex>
          )}
  
          <Button
            disabled={!(post && image)}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        </Flex>
      </WidgetWrapper>
    );
  };
  
  export default MyPostWidget;
  