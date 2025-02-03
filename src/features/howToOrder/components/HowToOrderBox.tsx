import { FC } from "react";
import { Box, Container, Typography, Link } from "@mui/material";
// import useSWR, { BareFetcher } from "swr";
import {
  deliveryDescriptionText,
  deliveryNavigateTitle,
  deliveryTitle,
  deliveryUnderlineTSyle,
} from "../../delivery/styles/deliveryStyle";
// import { BASE_URL } from "../../../api/instance";
import { Trans, useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom"; // Importing RouterLink from react-router-dom for navigation

// const fetcher: BareFetcher<any> = (url: string) =>
//   fetch(url).then((res) => res.json());

const HowToOrderBox: FC = () => {
  const { t } = useTranslation();
  // const { data, error, isLoading } = useSWR(() => {
  //   return `${BASE_URL}order-rule`;
  // }, fetcher);

  // const titleKey = `title_${i18n.language}`;
  // const descriptionKey = `desc_${i18n.language}`;

  // if (isLoading) {
  //   return (
  //     <Stack alignItems="center" mt={5}>
  //       <Typography sx={deliveryDescriptionText}>
  //         <CircularProgress />
  //         {/* {t("loading")} */}
  //       </Typography>
  //     </Stack>
  //   );
  // }

  // if (error) {
  //   return <Typography sx={deliveryDescriptionText}>{t("error")}</Typography>;
  // }

  // if (!data || !data[0]) {
  //   return <Typography sx={deliveryDescriptionText}>{t("noData")}</Typography>;
  // }

  // const rule = data[0];

  return (
    <>
      <Container>
        <Typography sx={deliveryNavigateTitle}>
          <Link
            component={RouterLink}
            to="/"
            sx={{ textDecoration: "none", color: "#000" }}
          >
            {t("home.mainPage")}
          </Link>{" "}
          /{" "}
          <Link
            component={RouterLink}
            to="/how-to-order"
            sx={{ textDecoration: "none", color: "#000" }}
          >
            {t("navbar.how_to_order")}
          </Link>
        </Typography>
        <Box>
          <Typography sx={deliveryTitle}>
            {/* {rule[titleKey] || rule.title_en || "Default Title"} */}

            {t("orderProcess.orderProcessTitle")}
          </Typography>
          <Box sx={deliveryUnderlineTSyle}></Box>
        </Box>
        <Typography
          sx={deliveryDescriptionText}
          // dangerouslySetInnerHTML={{
          //   __html: rule[descriptionKey] || rule.desc_en || "",
          // }}
        >
          <Trans
            i18nKey="orderProcess.orderProcessDesc"
            components={{ 1: <br /> }}
          />
        </Typography>
      </Container>
    </>
  );
};

export default HowToOrderBox;
