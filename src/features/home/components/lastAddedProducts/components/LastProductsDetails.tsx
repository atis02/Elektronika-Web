import { Box, Paper, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FC } from "react";
import {
  lastAddedProductCompanyName,
  lastAddedProductCost,
  lastAddedProductsImageBox,
  lastAddedProductTitle,
  productContainerStyle,
} from "../styles/lastAddedProductsStyle";
import { useProduct } from "../../../../../hooks/products/useProduct";
import { useNavigate } from "react-router-dom";
import { sideLinkBox } from "../../sidebar/components/sidelinksStyle";
import { BASE_URL_IMG } from "../../../../../api/instance";

const LastProductsDetails: FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { lastAddedDiscountedProducts, isLoading } = useProduct();
  console.log(lastAddedDiscountedProducts);

  const navigate = useNavigate();
  // Variants for the cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 1 },
    }),
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box position="sticky" top={60} zIndex="100">
        <Paper elevation={1} sx={sideLinkBox}>
          <Typography sx={{ fontWeight: 700, fontSize: "12px" }}>
            Soňky goşulan harytlar
          </Typography>
        </Paper>
        <Stack p={2} spacing={1} ref={ref}>
          {lastAddedDiscountedProducts?.map((product, index) => (
            <motion.div
              key={product.id}
              custom={index}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Box
                sx={productContainerStyle}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <Stack direction="row" spacing={1}>
                  <Box sx={lastAddedProductsImageBox}>
                    <img
                      // src={product.imageOne || "./images/banner1.png"}
                      src={`${BASE_URL_IMG}public/${product.imageOne}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      alt={product.nameEn}
                    />
                  </Box>
                  <Stack spacing={0.6}>
                    <Typography sx={lastAddedProductTitle}>
                      {product.nameTm || product.nameRu || product.nameEn}
                    </Typography>
                    <Typography sx={lastAddedProductCompanyName}>
                      {product.brand?.nameTm ||
                        product.brand?.nameTm ||
                        product.brand?.nameTm}
                    </Typography>
                    <Typography sx={lastAddedProductCost}>
                      {product.sellPrice - product.discount_priceTMT} m.
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </motion.div>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default LastProductsDetails;
