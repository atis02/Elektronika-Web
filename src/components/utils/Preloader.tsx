import { Box, Stack, Typography } from "@mui/material";

const PreLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={0}>
        <Stack direction="row" alignItems="center">
          {["e", "l", "e", "k", "t", "r", "o", "n", "i", "k", "a"].map(
            (letter) => (
              <Typography
                key={letter}
                className="Loader"
                fontSize={{ lg: 60, md: 60, sm: 50, xs: 40 }}
              >
                {letter}
              </Typography>
            )
          )}
        </Stack>
        <Stack direction="row" alignItems="center" height={30}>
          {[".", "t", "m"].map((letter) => (
            <Typography
              key={letter}
              className="Loader2"
              color="#B71C1C"
              fontSize={{ lg: 60, md: 60, sm: 50, xs: 40 }}
            >
              {letter}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default PreLoader;
