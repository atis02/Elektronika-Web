import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import { Suspense, useState, useEffect } from "react";
import ScrollToTop from "../language/utils/ScrollToTop ";
import CustomSkeletonLoader from "../components/skeleton/CustomSkeletonLoader";
import { Toaster } from "react-hot-toast";

import Home from "../features/home/presentation/Home";
import Categories from "../features/categories/presentation/Categories";
import Dashboard from "../features/dashboard/presentation/Dashboard";
import Products from "../features/products/presentation/Products";
import Users from "../features/users/presentation/Users";
import Favourites from "../features/Favourites/presentation/Favourites";
import Basket from "../features/basket/presentation/Basket";
import Delivery from "../features/delivery/presentation/Delivery";
import Auction from "../features/auction/presentation/Auction";
import Service from "../features/service/presentation/Service";
import ReturnExchange from "../features/returnExchange/presentation/ReturnExchange";
import HowToOrder from "../features/howToOrder/presentation/HowToOrder";
import AuctionDetail from "../features/auction/components/AuctionDetail";
import PresentCard from "../features/presentCard/presentation/PresentCard";
import BuyPresentCard from "../features/presentCard/components/BuyPresentCard";
import Embassy from "../features/embassy/presentation/Embassy";
import Compare from "../features/compare/presentation/Compare";
import FullDescriptionProduct from "../features/products/components/FullDescriptionProduct";
import NotFoundPage from "../components/layouts/NotFound";
import PreLoader from "../components/utils/Preloader";
import Account from "../features/account/presentation/Account";
import HowToRegister from "../features/howToRegister/presentation/howToRegister";
import PaymentSucces from "../features/paymentSucces";
// Custom Skeleton Loader

const App = () => {
  const [selectedFilters] = useState<any>({});
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    if (Object.keys(selectedFilters).length > 0) {
      // fetchFilteredProducts(selectedFilters);
    }
  }, [selectedFilters]);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2300);
  }, []);
  return (
    <>
      {loader ? (
        <PreLoader />
      ) : (
        <div>
          <BrowserRouter>
            <ScrollToTop />
            <Toaster />
            <Suspense fallback={<CustomSkeletonLoader />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products/" element={<Products />} />
                  <Route
                    path="/product/:productId"
                    element={<FullDescriptionProduct />}
                  />
                  <Route path="/users" element={<Users />} />
                  <Route path="/embassy" element={<Embassy />} />
                  <Route path="/basket" element={<Basket />} />
                  <Route path="/delivery" element={<Delivery />} />
                  <Route path="/auction" element={<Auction />} />
                  <Route
                    path="/auction-detail/:id"
                    element={<AuctionDetail />}
                  />
                  <Route path="/service" element={<Service />} />
                  <Route path="/return-exchange" element={<ReturnExchange />} />
                  <Route path="/how-to-order" element={<HowToOrder />} />
                  <Route path="/how-to-register" element={<HowToRegister />} />
                  <Route path="/present-card" element={<PresentCard />} />
                  <Route
                    path="/buy-present-card"
                    element={<BuyPresentCard />}
                  />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/successPayment" element={<PaymentSucces />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/favourites" element={<Favourites />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
      )}
    </>
  );
};

export default App;
