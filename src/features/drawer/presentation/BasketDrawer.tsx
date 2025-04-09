import React from "react";
import { Drawer, IconButton, Box, Typography, Stack } from "@mui/material";
import MiniBasket from "../components/MiniBasket";
import MiniBasketRight from "../components/MiniBasketRight";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

interface Bools {
  isOpen: boolean;
  toggleDrawer: (open: boolean) => void;
}

const AppDrawer: React.FC<Bools> = ({ isOpen, toggleDrawer }) => {
  return (
    <>
      <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
        {/* <List>
          {menuItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List> */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 100,
            display: "inline-block",
            width: "60vh",
          }}
        >
          <Stack
            direction="row"
            p={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton onClick={() => toggleDrawer(false)}>
              <KeyboardBackspaceIcon
                sx={{
                  color: "#B71C1C",
                  border: "1px solid #B71C1C",
                  borderRadius: "100%",
                  width: 30,
                  height: 30,
                }}
              />
            </IconButton>
            <Typography
              sx={{
                position: "relative",
                zIndex: 1,
                fontSize: "20px",
                fontWeight: 600,
                // p: 2,
              }}
            >
              Sebet
            </Typography>
            <span></span>
          </Stack>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: "5px",
              right: "0",
              height: "2px",
              backgroundColor: "#C3000E",
              width: "109.5%",
              transform: "translateX(-10%)",
            }}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="column"
          width="60vh"
          height="100%"
        >
          <MiniBasket />
          <MiniBasketRight />
        </Stack>
      </Drawer>
    </>
  );
};

export default AppDrawer;
