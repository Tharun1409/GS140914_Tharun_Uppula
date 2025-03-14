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
import styles from "./navbar.module.css";

const Navbar: React.FC = () => {
  // Extacting authentication state and function from the AuthContext
  const { user, loading, signInWithGoogle, signOutUser } = useAuth();
  //state to manage the user menu dropdown 
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar className={styles.toolbar}>
        <Box className={styles.logoContainer}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/GSynergylogo.svg`}
            alt="GSynergy Logo"
            style={{ height: 40 }}
          />
        </Box>

        <Typography variant="h6" className={styles.title}>
          Data Viewer App
        </Typography>

        <Box>
          {loading ? (
            <Typography variant="body2">Loading...</Typography>
          ) : user ? (
            <>
              <IconButton
                onClick={handleMenuOpen}
                color="inherit"
                aria-label="User menu"
                aria-controls="user-menu"
                aria-haspopup="true"
              >
                {user.photoURL ? (
                  <Avatar src={user.photoURL} alt="Profile" />
                ) : (
                  <AccountCircleIcon />
                )}
              </IconButton>
              <Menu
                id="user-menu"
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
