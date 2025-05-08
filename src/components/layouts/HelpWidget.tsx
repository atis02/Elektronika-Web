import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { Mail } from "@mui/icons-material";
import { Link } from "react-router-dom";
const HelpWidget = () => {
  return (
    <Stack
      sx={{
        width: "95%",
        p: 2,
        borderRadius: 3,
        // boxShadow: 5,
        position: "fixed",
        // bottom: 20,
        // right: 20,
        zIndex: 1000,
        // mt: -4,
      }}
    >
      <Box display="flex" alignItems="center" mb={2} mt={-2}>
        <Avatar
          src="/images/tmbot.png"
          alt="E"
          sx={{ width: 100, height: 100, mr: 1 }}
        />
        <Box>
          <Typography fontWeight={600}>Чат с экспертом</Typography>
          <Typography variant="body2" color="text.secondary">
            Elektronika.tm
          </Typography>
        </Box>
      </Box>

      <Button
        component="a"
        href="mailto:operator@tehnikadunyasi.com"
        variant="outlined"
        startIcon={<Mail sx={{ width: 25, height: 25 }} />}
        fullWidth
        sx={{ mb: 1, textTransform: "none" }}
      >
        Написать в почту
      </Button>
      <Button
        variant="outlined"
        component={Link}
        to="https://imo.im/"
        fullWidth
        target="_blank"
        sx={{ gap: 2, textTransform: "none" }}
      >
        <img src="/icons/imo.png" style={{ width: 25, height: 25 }} alt="" />
        Imo
      </Button>
      <Typography variant="body2" mt={1} color="text.secondary">
        Наши консультанты работают ежедневно с 9:00 до 18:00.
        <br />
      </Typography>
    </Stack>
  );
};

export default HelpWidget;
