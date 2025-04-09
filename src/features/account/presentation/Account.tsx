import { FC, useState } from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  size1_4,
  size4_1,
} from "../../../components/layouts/header/utils/gridSize";
import Sidebar from "../../home/components/sidebar/presentation/Sidebar";
import { TabPanel } from "../components/TabPanel";
import UserProfileData from "../components/userProfileData/UserProfileData";

const Account: FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <Container>
      <Grid container width="100%" mt={2} spacing={2}>
        <Grid
          size={size1_4}
          sx={{ display: { lg: "block", md: "block", sm: "none", xs: "none" } }}
        >
          <Box>
            <Sidebar />
          </Box>

          {/* <Stack mt={4} spacing={4} position="sticky" top={60} zIndex="100">
            <Box>
              <LastAddedProducts />
            </Box>
          </Stack> */}
        </Grid>
        <Grid size={size4_1}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={{
                  style: { backgroundColor: "#B71C1C" }, // Set indicator color here
                }}
                sx={{
                  minHeight: 38,
                }}
              >
                <Tab
                  label="Profil"
                  {...a11yProps(0)}
                  sx={{
                    p: 0.5,
                    minHeight: 38,
                    textTransform: "revert",
                    "&.Mui-selected": {
                      color: "#B71C1C",
                    },
                  }}
                />
                <Tab
                  label="Sowgat sertifikatlarym"
                  {...a11yProps(1)}
                  sx={{
                    p: 0.5,
                    minHeight: 38,
                    textTransform: "revert",
                    "&.Mui-selected": {
                      color: "#B71C1C",
                    },
                  }}
                />
                <Tab
                  label="Sargytlarym"
                  {...a11yProps(2)}
                  sx={{
                    p: 0.5,
                    minHeight: 38,
                    textTransform: "revert",
                    "&.Mui-selected": {
                      color: "#B71C1C",
                    },
                  }}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <UserProfileData />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Sowgat sertifikatlarym
            </TabPanel>
            <TabPanel value={value} index={2}>
              Sargytlarym
            </TabPanel>
          </Box>
          {/* <Box>
            <Banner />
          </Box>
          <Box my={3}>
            <DiscountedGoods />
          </Box>
          <Box my={3}>
            <OfferedGoods />
          </Box>
          <Box my={3}>
            <GoodOfWeek />
          </Box>
          <Box my={3}>
            <OurPartners />
          </Box> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
