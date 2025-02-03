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
            {t("header.our_address")}
          </Typography>
        </Box>
        <Box>
          <Typography sx={footerAddressText}>Telefon: </Typography>
          <Typography sx={footerLinksStyle2}>
            (+993 60) 14-22-41; (+993 62) 56-01-31
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
