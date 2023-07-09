import { Typography, Box, Button } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>VUI - صفحه مورد نظر پیدا نشد</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography
            fontWeight="bold"
            color="primary"
            fontSize={80}
            gutterBottom
          >
            صفحه مورد نظر پیدا نشد
          </Typography>
          <Button
            onClick={() => router.push("/")}
            variant="outlined"
            size="large"
          >
            برگشت به خانه
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NotFound;
