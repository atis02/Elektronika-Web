import { FC } from "react";
import { Stack, Typography, Skeleton } from "@mui/material";
import {
  headerContactSubTitle,
  headerContactTitle,
} from "../styles/headerStyles";
import { useTranslation } from "react-i18next";

interface HeaderContactsProps {
  isLoading: boolean;
}

const HeaderContacts: FC<HeaderContactsProps> = ({ isLoading }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={150} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={100} />
        </Stack>
        <Stack>
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={150} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={100} />
        </Stack>
        <Stack>
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={150} />
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={150} />
        </Stack>
      </Stack>
    );
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography sx={headerContactTitle}>
            {t("header.work_time")}
          </Typography>
          <Typography sx={headerContactSubTitle}>
            {t("header.work_hours")}
          </Typography>
        </Stack>
        <Stack>
          <Typography sx={headerContactTitle}>
            {t("header.address_title")}
          </Typography>
          <Typography sx={headerContactSubTitle}>
            {t("header.our_address")}
          </Typography>
        </Stack>
        <Stack>
          <Typography sx={headerContactTitle}>+993 60 14 22 51</Typography>
          <Typography sx={headerContactTitle}>+993 62 56 01 31</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default HeaderContacts;
