import { FC } from "react";
import { useNavigate } from "react-router-dom";

const BasketM: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <img
        src="/icons/basket.svg"
        onClick={() => navigate("/basket")}
        style={{ width: "20px" }}
        alt="basket picture"
      />
    </>
  );
};

export default BasketM;
