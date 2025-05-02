import { Box, Stack, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";

const GridLoading = () => {
  return (
    <Grid container spacing={2} my={3}>
      {Array.from(new Array(4)).map((_, index) => (
        <Grid key={index} size={{ lg: 3, md: 4, sm: 6, xs: 6 }}>
          <Box sx={{ background: "#f7f7f7", p: 2, borderRadius: "6px" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Skeleton variant="rectangular" width={100} height={100} />
            </Box>
            <Stack my={2}>
              <Skeleton variant="text" sx={{ fontSize: "1rem", width: 120 }} />
              <Skeleton variant="text" sx={{ fontSize: "0.9rem", width: 80 }} />
              <Stack direction="row" spacing={1} my={1}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "0.9rem", width: 60 }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "0.9rem", width: 30 }}
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Skeleton variant="text" sx={{ fontSize: "1rem", width: 50 }} />
                <Skeleton variant="rectangular" width={40} height={30} />
              </Stack>
            </Stack>
            <Skeleton variant="rectangular" width="100%" height={40} />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
            >
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton variant="rectangular" width={60} height={30} />
            </Stack>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridLoading;
