import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import Slider from "react-slick";
import useSWR from "swr";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  feedbackAvatar,
  feedbackMessage,
  feedbackTypeText,
} from "../styles/feedbackStyle";
import { BASE_URL, BASE_URL_IMG } from "../../../../../api/instance";
import { useNavigate } from "react-router-dom";
import AddCommentIcon from "@mui/icons-material/AddComment";
import AddCommentModal from "./AddCommentModal";
import useDrawer from "../../../../../components/layouts/navbar/components/useDrawer";
import Login from "../../../../../components/login/Login";
import toast from "react-hot-toast";

interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  comment: string;
  role: string;
  productId: string;
  commentator: {
    name: string;
    surname: string;
    image: string;
  };
  description: string;
}

const fetcher = async <T,>(url: string): Promise<T> => {
  const res = await axios.get(url);
  return res.data;
};
const Feedbacks: FC = () => {
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const navigate = useNavigate();
  const loggedUser = localStorage.getItem("ElectronicaUser");
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const { data, error } = useSWR<Comment[]>(`${BASE_URL}comment/all`, fetcher);
  if (error) return <div>Error loading feedbacks.</div>;
  if (!data) return <div>Loading feedbacks...</div>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    height: "100%",
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const handleOpen = () => {
    if (loggedUser) {
      setOpenCommentModal(true);
    } else {
      openDrawer();
      toast.error("Ulgama giriň!");
    }
  };
  return (
    <Box sx={{ my: 1 }}>
      <Slider {...sliderSettings}>
        {data.slice(0, 8).map((comment) => (
          <Stack
            key={comment.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              alignItems: "end",
              justifyContent: "flex-start",
            }}
          >
            <Stack direction="row" justifyContent="center" my={2} mt={0}>
              <img src="/icons/“.svg" alt="feedback icon" />
            </Stack>
            <Typography sx={feedbackMessage}>{comment.description}</Typography>
            <Stack direction="row" alignItems="center" spacing={2} mt={2}>
              <Avatar
                sx={feedbackAvatar}
                alt={comment.commentator?.name}
                onClick={() =>
                  comment.productId && navigate(`/product/${comment.productId}`)
                }
                src={
                  `${BASE_URL_IMG}public/${comment.commentator?.image}` ||
                  "./images/avatar2.webp"
                }
              />
              <Stack>
                <Typography sx={feedbackMessage}>
                  {comment.commentator?.name} {comment.commentator?.surname}
                </Typography>
                <Typography sx={feedbackTypeText}>Musderi</Typography>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Slider>
      <Stack alignItems="end">
        <IconButton
          sx={{
            width: 50,
            height: 50,
            p: 0,
            color: "#B71C1C",
            alignItems: "center",
            justifyContent: "center",
            mt: -5,
          }}
          onClick={handleOpen}
        >
          <AddCommentIcon
            sx={{
              width: 35,
              height: 35,
            }}
          />
        </IconButton>
      </Stack>
      <AddCommentModal
        isOrdered={true}
        productId={""}
        open={openCommentModal}
        onClose={() => setOpenCommentModal(false)}
      />
      <Login isOpen={isOpen} onClose={closeDrawer} />
    </Box>
  );
};

export default Feedbacks;
