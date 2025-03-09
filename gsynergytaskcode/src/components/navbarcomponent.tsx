import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../context/authcontext";

const Navbar: React.FC = () => {
  const { user, loading, signInWithGoogle, signOutUser } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: "black", boxShadow: 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <img
            src={`${process.env.PUBLIC_URL}/assets/GSynergylogo.svg`}
            alt="GSynergy Logo"
            style={{ height: 40 }}
          />
        </Box>

        <Typography variant="h6">Data Viewer App</Typography>

        <Box>
          {loading ? (
            <Typography variant="body2">Loading...</Typography>
          ) : user ? (
            <>
              <IconButton onClick={handleMenuOpen} color="inherit">
                {user.photoURL ? (
                  <Avatar src={user.photoURL} alt="Profile" />
                ) : (
                  <AccountCircleIcon />
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled>{user.displayName || "User"}</MenuItem>
                <MenuItem onClick={signOutUser}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              onClick={signInWithGoogle}
              variant="contained"
              color="primary"
            >
              Sign In with Google
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
