import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

const NavBar = () => {
  const history = useRouter();

  const isAuth = useSelector((state) => state.token);

  return (
    <Box>
      <AppBar
        color="primary"
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                cursor: "pointer",
                flexGrow: 1,
              }}
              onClick={() => history.push("/")}
            >
              VUI
            </Typography>
            <Button
              variant="text"
              onClick={() => history.push(isAuth ? "/panel" : "/auth")}
              sx={{
                color: "white",
              }}
            >
              پنل
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default NavBar;
