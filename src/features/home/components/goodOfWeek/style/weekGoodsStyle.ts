export const weeksGoodsSmallImageBox = {
  width: { lg: "95px", md: "95px", sm: "85px", xs: "75px" },
  height: { lg: "95px", md: "95px", sm: "85px", xs: "75px" },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #D9D9D9",
  borderRadius: "4px",
  padding: "5px",
  cursor: "pointer",
};

export const weeksGoodsBigImageBox = {
  width: "100%",
  height: { lg: "400px", md: "400px", sm: "400px", xs: "260px" },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "5px",
};

export const weeksGoodTitle = {
  color: "#C3000E",
  fontSize: "16px",
  fontWeight: 600,
};

export const weeksGoodQualityDetail = {
  color: "#000000",
  fontSize: "24px",
  fontWeight: 600,
};

export const weeksGoodSubQualityDetail = {
  color: "#929292",
  fontSize: "16px",
  fontWeight: 400,
};

export const weeksGoodCurrentCost = {
  color: "#000000",
  fontSize: "18px",
  fontWeight: 700,
};

export const weeksGoodOldCost = {
  color: "#929292",
  fontSize: "14px",
  fontWeight: 400,
  textDecoration: "line-through",
};
export const mainColor = "#B71C1C";
export const weeksGoodBuyNowButton = {
  textTransform: "none",
  background: "#E0E0E0",
  color: "#2E2F38",
  fontSize: { lg: "18px", md: "18px", sm: "16px", xs: "15px" },
  fontWeight: 700,
  borderRadius: "4px",
  width: { lg: "242px", md: "242px", sm: "100%", xs: "100%" },
  height: { lg: "57px", md: "55px", sm: "50px", xs: "40px" },
  position: "relative",
  "&:before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "10px",
    height: "10px",
    backgroundColor: "transparent",
    borderRadius: "50%",
    transform: "translate(-50%, -50%) scale(1)",
    opacity: 0.5,
    animation: "dropEffect 0.4s ease-out",
  },
  "@keyframes dropEffect": {
    "0%": {
      transform: "translate(-50%, -50%) scale(1)",
      opacity: 0.5,
    },
    "100%": {
      transform: "translate(-50%, -50%) scale(6)",
      opacity: 0,
    },
  },
  "& .MuiTouchRipple-root": {
    color: mainColor,
  },
};
