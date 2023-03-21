import { Typography, useTheme, Checkbox, Box, IconButton, TextField } from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "constants";
import { setBucketlistItem, setBucketlist } from "state";
import Flex from "components/Flex";

const BucketListItemWidget = ({
    Id,
    itemDescription,
    status
  }) => {
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const { palette } = useTheme();
  const medium = palette.neutral.medium;

  const [isEdit, setIsEdit] = useState(false);
  const [newItemDescription, setNewItemDescription] = useState(itemDescription);

  const handleOnChangeStatus = async (status) => {

    const response = await fetch(`${BACKEND_URL}/bucketlist/${Id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        itemDescription: itemDescription,
        status:status
      })
    });
    const bucketListItem = await response.json();
    if(response.status === 200){
      dispatch(setBucketlistItem({ itemId: Id, item: bucketListItem }));
    }
  }

  const handleOnClickDelete = async (status) => {

    const response = await fetch(`${BACKEND_URL}/bucketlist/${Id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if(response.status === 200){
      const bucketlist = await response.json();
      dispatch(setBucketlist({ bucketlist }));
    }
  }

  const handleOnClickSave = async () => {

    const response = await fetch(`${BACKEND_URL}/bucketlist/${Id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        itemDescription: newItemDescription,
        status: status
      })
    });
    if(response.status === 200){
      const bucketListItem = await response.json();
      dispatch(setBucketlistItem({ itemId: Id, item: bucketListItem  }));
      setIsEdit(!isEdit);
    }
  }

  return (
    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
      <Checkbox
                checked={status}
                onChange={(e) => {handleOnChangeStatus(e.target.checked)}}
            />
      {isEdit && 
      <Flex>
        <TextField value={newItemDescription} onChange={(e) => setNewItemDescription(e.target.value)}/>
        <Flex>
          <IconButton onClick={() => handleOnClickSave()}>
            <Save />
          </IconButton>
        </Flex>
      </Flex>
      }
      {!isEdit && 
      <>
      <Typography color={medium}>{itemDescription}</Typography>
      <Flex marginLeft="auto">
        <IconButton onClick={() => setIsEdit(!isEdit)}>
          <Edit />
        </IconButton>
        <IconButton onClick={handleOnClickDelete}>
          <Delete />
        </IconButton>
      </Flex>
      </>
      }
    </Box>
  );
};

export default BucketListItemWidget;