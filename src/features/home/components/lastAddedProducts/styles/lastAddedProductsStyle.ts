export const productContainerStyle = {
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    transform: "scale(1.05)",
    background: "#F7F7F7",
  },
  borderRadius: "6px",
};

export const lastAddedProductsImageBox = {
  width: "60px",
  height: "60px",
  background: "#F7F7F7",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transform: "scale(1.05)",
  },
};

export const lastAddedProductTitle = {
  fontSize: "10px",
  fontWeight: 600,
  lineHeight: "11px",
  color: "#000000",
};

export const lastAddedProductCompanyName = {
  color: "#0470C4",
  fontSize: "10px",
  fontWeight: 600,
  lineHeight: "11px",
  textTransform:'uppercase',
};

export const lastAddedProductCost = {
  color: "#2E2F38",
  fontSize: "12px",
  fontWeight: 700,
  lineHeight: "14px",
};
