import { Typography, useTheme, Box, IconButton, Divider, TextField } from "@mui/material";
import { Add, Save } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Flex from "components/Flex";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";
import { BACKEND_URL } from "constants";
import { setBucketlist } from "state";
import BucketListItemWidget from "./BucketListItemWidget";

const BucketListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const bucketlist = useSelector((state) => state.bucketlist);
  const token = useSelector((state) => state.token);

  const getBucketlist = async () => {
    const response = await fetch(`${BACKEND_URL}/bucketlist/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    if(response.status === 200) {
      const data = await response.json();
      dispatch(setBucketlist({ bucketlist: data }));
    }
  };


  useEffect(() => {
    getBucketlist();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

    
  const [isAdd, setIsAdd] = useState(false);
  const [newItemDescription, setNewItemDescription] = useState("");

  const onClickSave = async () => {
    const response = await fetch(`${BACKEND_URL}/bucketlist/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"  },
      body: JSON.stringify({ itemDescription: newItemDescription })
    });
    const data = await response.json();
    if(response.status === 201) {
      dispatch(setBucketlist({ bucketlist: data }));
      setIsAdd(false);
      setNewItemDescription("");
    }
  };

  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  return (
    <WidgetWrapper>
      <Flex>
        <Typography color={dark} variant="h5" fontWeight="500">
          Bucket List
        </Typography>
        <Flex>
          <IconButton onClick={() => setIsAdd(!isAdd)}>
            <Add />
          </IconButton>
        </Flex>
      </Flex>
      {
        isAdd && 
        <Flex>
          <Divider/>
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <TextField value={newItemDescription} 
              onChange={(e) => setNewItemDescription(e.target.value)} multiline={true}/>
              <Flex marginLeft="auto">
                <IconButton onClick={onClickSave}>
                  <Save />
                </IconButton>
              </Flex>
            </Box>
          <Divider/>
        </Flex>
      }
      <Box p="1rem 0">
        {bucketlist.map(
          ({
            _id,
            itemDescription,
            status,
          }) => (
            <BucketListItemWidget
            Id={_id}
            itemDescription={itemDescription}
            status={status}
            />
          )
        )}
       </Box>
     </WidgetWrapper>
  );
};

export default BucketListWidget;