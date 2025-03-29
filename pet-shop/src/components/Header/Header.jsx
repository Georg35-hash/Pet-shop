import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "../Header/Header.module.css";
import logo from "../../assets/header/logo.svg";
import shopIcon from "../../assets/header/shop-icon.svg";
import useShoppingCartStore from "../../zustand/stores/shoppingCart";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { useTheme } from "@mui/material/styles";

export default function Header({ toggleTheme, mode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalCount = useShoppingCartStore((state) =>
    Object.values(state.products).reduce(
      (total, product) => total + product.count,
      0
    )
  );

  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { label: "Main Page", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: "All Products", path: "/products" },
    { label: "All Sales", path: "/allsales" },
  ];

  return (
    <>
      <AppBar
        variant="elevation"
        position="fixed"
        sx={(theme) => ({
          padding: "10px 0 0 0",
          background: theme.palette.background.default,
        })}
      >
        <Toolbar
          sx={{
            display: "flex",
            margin: "0 auto",
            maxWidth: "1440px",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <NavLink to="/">
            <img className={styles.icons} src={logo} alt="logo" />
          </NavLink>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={styles.navLink}
                style={{
                  color: theme.palette.mode === "light" ? "#000000" : "#ffffff",
                  transition: "color 0.3s ease",
                }}
              >
                <Typography variant="body1">{link.label}</Typography>
              </NavLink>
            ))}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeSwitcher toggleTheme={toggleTheme} mode={mode} />
            <Link to="/checkout">
              <Badge
                badgeContent={totalCount}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#0D50FF",
                    fontSize: "14px",
                    top: 15,
                    right: 36,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  },
                }}
              >
                <img
                  className={styles.icons}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                  src={shopIcon}
                  alt="shopIcon"
                />
              </Badge>
            </Link>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ display: { md: "none" }, ml: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon sx={{ color: "black", fontSize: 28 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: "64px" }} />
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            color: theme.palette.text.primary,
            padding: "20px",
          },
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {navLinks.map((link) => (
            <ListItem
              key={link.path}
              onClick={handleDrawerToggle}
              sx={{
                display: "block",
                textAlign: "center",
              }}
            >
              <NavLink to={link.path} className={styles.navLink}>
                <Typography
                  variant="body1"
                  sx={{
                    color:
                      theme.palette.mode === "light" ? "#000000" : "#ffffff",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#0d50ff",
                    },
                  }}
                >
                  {link.label}
                </Typography>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
