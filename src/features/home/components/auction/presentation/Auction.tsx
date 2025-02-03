import { FC, useState, useEffect } from "react";
import AuctionDetails from "../components/AuctionDetails";
import axios from "axios";
import { BASE_URL } from "../../../../../api/instance";

const Auction: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blurhash, setBlurhash] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlurhash = async () => {
      try {
        const response = await axios.get(`${BASE_URL}banners?limit=1&page=1`);
        const data = response.data.data;
        if (data && data.length > 0 && data[0].blurhash) {
          setBlurhash(data[0].blurhash);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("error fetchin blurhash:", error);
        setIsLoading(false);
      }
    };

    fetchBlurhash();
  }, []);

  return (
    <>
      <AuctionDetails isLoading={isLoading} blurhash={blurhash || undefined} />
    </>
  );
};

export default Auction;
