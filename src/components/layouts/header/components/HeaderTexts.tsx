import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import {
  headerContactSubTitle,
  headerContactTitle,
} from "../styles/headerStyles";
import { Trans } from "react-i18next";
import HeaderContactsSearch from "./HeaderContacts";

interface HeaderContactsProps {
  isLoading: boolean;
}
const HeaderContacts: FC<HeaderContactsProps> = ({ isLoading }) => {
  return (
    <Stack
      direction="row"
      gap={3}
      ml={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack>
        <Typography sx={headerContactSubTitle}>
          <Trans i18nKey="header.work_hours" components={{ 1: <br /> }} />
        </Typography>
      </Stack>
      <HeaderContactsSearch isLoading={isLoading} />
      <Stack>
        <Typography sx={headerContactTitle}>+993 60 14 22 51</Typography>
        <Typography sx={headerContactTitle}>+993 62 56 01 31</Typography>
      </Stack>
    </Stack>
  );
};

export default HeaderContacts;
