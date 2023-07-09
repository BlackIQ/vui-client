import { CircularProgress, Box } from "@mui/material";

const Loading = () => {
  return (
    <Box py={5} textAlign="center">
      <CircularProgress />
    </Box>
  );
};

export default Loading;
