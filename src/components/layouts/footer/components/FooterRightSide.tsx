import { FC } from "react";
// import Grid from "@mui/material/Grid2";
import { Box, Stack } from "@mui/material";
import FooterTitle from "./FooterTitle";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterMobileApps from "./FooterMobileApps";
import FooterSocialLinks from "./FooterSocialLinks";
import { useTranslation } from "react-i18next";
import NavLinks from "../../navbar/components/NavLinks";
import i18n from "../../../../language/i18n";

const FooterRightSide: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* <Grid container>
        <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
          <Stack spacing={2}>
            <FooterTitle text="Tiz kömek" />
            <Box>
              <FooterLinks />
            </Box>
          </Stack>
        </Grid>
        <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
          <Stack spacing={2}>
            <FooterTitle text="Habarlaşmak üçin" />
            <Box>
              <FooterContact />
            </Box>
          </Stack>
        </Grid>
        <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
          <Stack spacing={2}>
            <FooterTitle text="Mobil goşundylar" />
            <Box>
              <FooterMobileApps />
            </Box>
          </Stack>
        </Grid>
        <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
          <Stack direction="row" justifyContent={"flex-end"}>
            <Stack spacing={2}>
              <FooterTitle text="Sosial ulgam" />
              <Box>
                <FooterSocialLinks />
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid> */}
      <Stack direction="row" flexWrap="wrap" justifyContent={"space-between"}>
        <Stack spacing={2}>
          <FooterTitle text={t("footer.footerFastHelp")} />
          <Box>
            <FooterLinks />
          </Box>
        </Stack>
        <Stack spacing={2}>
          <FooterTitle text={t("footer.links")} />
          <Box>
            <NavLinks />
          </Box>
        </Stack>
        <Stack maxWidth={215} spacing={2}>
          <FooterTitle text={t("footer.contacts")} />
          <Box>
            <FooterContact />
          </Box>
        </Stack>
        {i18n.language === "ru" ? (
          <Stack spacing={3}>
            <Stack spacing={2}>
              <FooterTitle text={t("footer.apps")} />
              <Box>
                <FooterMobileApps />
              </Box>
            </Stack>
            <Stack spacing={2}>
              <FooterTitle text={t("footer.socialLinks")} />
              <Box>
                <FooterSocialLinks />
              </Box>
            </Stack>
          </Stack>
        ) : (
          <>
            <Stack spacing={2}>
              <FooterTitle text={t("footer.apps")} />
              <Box>
                <FooterMobileApps />
              </Box>
            </Stack>
            <Stack spacing={2}>
              <FooterTitle text={t("footer.socialLinks")} />
              <Box>
                <FooterSocialLinks />
              </Box>
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};

export default FooterRightSide;
