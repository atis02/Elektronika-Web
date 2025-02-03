import { Box, Skeleton, Stack, Container, Grid } from "@mui/material";
import { FC } from "react";

const CustomSkeletonLoader: FC = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header Skeleton */}
      <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Skeleton variant="rectangular" width={150} height={40} />
          <Skeleton variant="rectangular" width={150} height={40} />
          <Skeleton variant="rectangular" width={150} height={40} />
        </Stack>
      </Box>

      {/* Main Content with Sidebar and Product Grid Skeleton */}
      <Container sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          {/* Sidebar Skeleton */}
          <Grid item lg={3} md={3} sm={4} xs={12}>
            <Box sx={{ p: 1 }}>
              <Skeleton
                variant="rectangular"
                width={100}
                height={30}
                sx={{ marginBottom: 1 }}
              />
              {Array.from({ length: 5 }, (_, index) => (
                <Stack key={index} spacing={1} my={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Skeleton variant="circular" width={30} height={30} />
                    <Skeleton variant="text" width={100} />
                  </Stack>
                  <Stack pl={2}>
                    {Array.from({ length: 2 }, (_, index) => (
                      <Skeleton variant="text" key={index} width={80} />
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Box>
          </Grid>

          {/* Product Grid Skeleton */}
          <Grid item lg={9} md={9} sm={8} xs={12}>
            <Grid container spacing={2}>
              {Array.from({ length: 4 }, (_, index) => (
                <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
                  <Box
                    sx={{
                      p: 2,
                      border: "1px solid #eee",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton variant="rectangular" width={150} height={150} />
                    <Stack my={2}>
                      <Skeleton variant="text" width={100} />
                      <Skeleton variant="text" width={80} />
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Skeleton variant="text" width={50} />
                        <Skeleton
                          variant="rectangular"
                          width={30}
                          height={20}
                        />
                      </Stack>
                    </Stack>
                    <Skeleton variant="rectangular" width={100} height={30} />
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      mt={1}
                    >
                      <Skeleton variant="rectangular" width={70} height={30} />
                      <Skeleton variant="rectangular" width={60} height={30} />
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CustomSkeletonLoader;
