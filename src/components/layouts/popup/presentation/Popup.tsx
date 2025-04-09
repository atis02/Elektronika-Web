import { Box, Grow, IconButton, Modal, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, BASE_URL_IMG } from "../../../../api/instance";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { decode } from "blurhash";

interface Popup {
  image: string;
  id: string;
  description: string;
  productId: string;
  blurhash: string;
}

const PopupComponent: React.FC = () => {
  const [popupData, setPopupData] = useState<Popup | null>(null);
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(3);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const fetchPopupData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}popup/all`);
      console.log(response.data.popup);

      if (response.data && response.data.popup.length > 0) {
        const latestPopup = response.data.popup[0];
        const storedPopupId = localStorage.getItem("popupId");

        if (storedPopupId !== latestPopup.id) {
          setPopupData(latestPopup);
          setOpen(true);
        }
      }
    } catch (error) {
      console.error("Ошибка при получении попапа:", error);
    }
  };

  useEffect(() => {
    fetchPopupData();
  }, []);

  useEffect(() => {
    let timer: number;
    if (open && imageLoaded) {
      setCounter(3);
      timer = window.setInterval(() => {
        setCounter((prev) => {
          if (prev <= 1) {
            localStorage.setItem("popupId", popupData?.id || "");
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [open, imageLoaded]);

  const handleClose = () => {
    localStorage.setItem("popupId", popupData?.id || "");
    setOpen(false);
  };

  return (
    popupData && (
      <Modal
        disableAutoFocus
        closeAfterTransition
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Grow in={open}>
            <Stack>
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
              >
                {counter !== 0 ? (
                  <Typography variant="body2" color="white">
                    {counter}
                  </Typography>
                ) : (
                  <IconButton
                    sx={{ color: "#fff", border: "1px solid #fff", p: 0.5 }}
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>

              <LazyLoadImage
                onLoad={() => setImageLoaded(true)}
                onClick={() => {
                  if (popupData.productId) {
                    setOpen(false);
                    navigate(`/product/${popupData.productId}`);
                  }
                }}
                src={`${BASE_URL_IMG}public/${popupData.image}`}
                alt={popupData.description}
                placeholderSrc={blurHashToBase64(popupData.id) || ""}
                // placeholderSrc={
                //   popupData.blurhash ? blurHashToBase64(popupData.blurhash) : blurHashToBase64(popupData.id)||null
                // }
                effect="blur"
                style={{
                  maxWidth: "600px",
                  maxHeight: "600px",
                  borderRadius: "8px",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
            </Stack>
          </Grow>
        </Box>
      </Modal>
    )
  );
};

const blurHashToBase64 = (
  blurhash: string,
  width: number = 32,
  height: number = 32
) => {
  try {
    const pixels = decode(blurhash, width, height);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  } catch (e) {
    console.error("Ошибка обработки BlurHash", e);
    return null;
  }
};

export default PopupComponent;
