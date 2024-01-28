import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import { NavbarConnectBtn } from "../hashconnect/NavbarConnectBtn";
import Logo from "../../images/logo.png"

export const Navbar = () => {
  return (
    <AppBar position="sticky" className="navbar">
      <Toolbar>
      <Box
            component="img"
            sx={{
            height: 100,
            }}
            alt="Aqua"
            src={Logo}
        />

        <Box ml="auto">
          <NavbarConnectBtn />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
