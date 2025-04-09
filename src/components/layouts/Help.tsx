import { FC, useEffect, useState } from "react";
import { Box, Button, Modal, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HeaderContactsSearch from "./header/components/HeaderContacts";

interface ModalProps {
  handleClose: () => void;
  open: boolean;
}
const Help: FC<ModalProps> = ({ open, handleClose }) => {
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { lg: "35%", md: "80%", sm: "80%", xs: "90%" },
    height: { lg: "80%", md: "80%", sm: "90%", xs: "90%" },
    bgcolor: "background.paper",
    border: "1px solid gray",
    boxShadow: 24,
    borderRadius: 3,
    p: 2,
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between">
          <Stack></Stack>
          <Button onClick={handleClose}>
            <CloseIcon sx={{ color: "#B71C1C" }} />
          </Button>
        </Stack>
        <Stack>
          <HeaderContactsSearch isLoading={isLoading} />
        </Stack>
      </Box>
    </Modal>
  );
};
export default Help;
