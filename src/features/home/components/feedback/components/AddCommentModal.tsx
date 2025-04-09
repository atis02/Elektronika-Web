import { Box, Button, Modal, Stack } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { BASE_URL } from "../../../../../api/instance";
import toast from "react-hot-toast";

interface AddCommentModalProps {
  onClose: () => void;
  open: boolean;
  productId: string;
  isOrdered: boolean;
}

const AddCommentModal: React.FC<AddCommentModalProps> = ({
  open,
  onClose,
  isOrdered = true,
  productId = null,
}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const loggedUser = localStorage.getItem("ElectronicaUser");
    if (loggedUser) {
      const isLogged = JSON.parse(loggedUser);
      console.log(isOrdered);

      if (isOrdered) {
        try {
          const body = {
            creatorId: isLogged.id,
            description: comment,
            productId: productId,
          };
          await axios.post(`${BASE_URL}comment/add`, body).then((resp) => {
            console.log(resp.data);
            if (resp.data.message == "Komment döredildi!") {
              toast.success("Üstünlikli!");
              onClose();
              setComment("");
            }
          });
        } catch (error) {}
      } else {
        toast.error("Haryt sargyt etmezden teswir ýazmak mümkin däl!");
      }
    } else {
      toast.error("Ulgama giriň!");
    }
  };
  return (
    <Modal disableAutoFocus closeAfterTransition open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          height: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 1,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Stack></Stack>
          <Button onClick={onClose}>
            <CloseIcon sx={{ color: "#B71C1C" }} />
          </Button>
        </Stack>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Teswir ýazyň..."
          rows={4}
          style={{
            color: "inherit",
            padding: "8px",
            minHeight: "100px",
            height: "180px",
            maxHeight: "250px",
            width: "95%",
            marginTop: 10,
            borderRadius: "5px",
            background: "inherit",
            resize: "vertical",
            overflowX: "auto",
            transition: "border-color 0.3s ease",
          }}
        />
        <Stack alignItems="end" pr={2}>
          <Button
            sx={{
              marginTop: 1,
              backgroundColor: "#b71c1c",
              color: "white",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
              transition: "background-color 0.3s ease",
            }}
            onClick={handleSubmit}
          >
            Goşmak
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddCommentModal;
