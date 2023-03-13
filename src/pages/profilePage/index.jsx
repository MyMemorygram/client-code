import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavigationBar from "pages/navigationBar";
import UserProfileWidget from "pages/widgets/UserProfileWidget";
import MyPostWidget from "pages/widgets/MyPostWidget";
import PostsWidget from "pages/widgets/PostsWidget";
import AdvertWidget from "pages/widgets/AdvertWidget";

const ProfilePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, profilePicturePath } = useSelector((state) => state.user);

    return (
        <Box>
            <NavigationBar/>
            <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserProfileWidget userId={_id} profilePicturePath={profilePicturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                    >
                        <MyPostWidget profilePicturePath={profilePicturePath} />
                        <PostsWidget userId={_id} />
                </Box>
                {isNonMobileScreens && (
                <Box flexBasis="26%">
                    <AdvertWidget />
                    <Box m="2rem 0" />
                </Box>
                )}
            </Box>
        </Box>

        
    );
}

export default ProfilePage;