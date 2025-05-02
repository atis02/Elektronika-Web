import { Box } from "@mui/material";
import { FC } from "react";
import { auctionImageBox } from "../styles/discoutGoodsStyle";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { BASE_URL_IMG } from "../../../../../api/instance";
import { decode } from "blurhash";

type Props = {
  product: {
    imageOne: string;
    title_en: string;
    id: string;
    nameEn: string;
    blurhash: string;
  };
};
const blurHashToBase64 = (
  blurhash: string,
  width: number = 32,
  height: number = 32
) => {
  if (!blurhash) return null;
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
    console.error("error blurhash", e);
    return null;
  }
};
export const ProductImageOne: FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Box sx={auctionImageBox}>
      <LazyLoadImage
        onClick={() => navigate(`/product/${product.id}`)}
        src={
          product.imageOne === null
            ? "/navbarIcons/logo.svg"
            : `${BASE_URL_IMG}public/${product.imageOne}`
        }
        alt={product.nameEn}
        placeholderSrc={blurHashToBase64(product.blurhash) || ""}
        effect="blur"
        style={{
          width: "85%",
          height: "80%",
          objectFit: "cover",
          cursor: "pointer",
          opacity: product.imageOne === null ? "30%" : 1,
        }}
      />
    </Box>
  );
};
