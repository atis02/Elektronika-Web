import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { footerAddressText, footerLinksStyle2 } from "../styles/footerStyles";
import { useTranslation } from "react-i18next";

const FooterContact: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Stack>
        <Box>
          <Typography sx={footerAddressText}>
            {t("header.address_title")} :
          </Typography>
          <Typography sx={footerLinksStyle2}>
            {/* Aşgabat, Bitarap Türkmenistan şaýoly 183 */}
            {t("footer.address")}
          </Typography>
        </Box>
        <Box>
          <Typography sx={footerAddressText}>Telefon: </Typography>
          <Typography sx={footerLinksStyle2}>
            <a
              href="tel:142241"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              (+993 60) 14-22-51
            </a>
            <br />
            <a
              href="tel:(+993 62) 56-01-31"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              (+993 62) 56-01-31
            </a>
          </Typography>
        </Box>
        <Box>
          <Typography sx={footerAddressText}>E-mail: </Typography>
          <Typography sx={footerLinksStyle2}>
            contact1@tehnikadunyasi.com
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default FooterContact;
