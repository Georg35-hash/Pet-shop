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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "../Header/Header.module.css";
import logo from "../../assets/header/logo.svg";
import shopIcon from "../../assets/header/shop-icon.svg";
import useShoppingCartStore from "../../zustand/stores/shoppingCart";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalCount = useShoppingCartStore((state) =>
    Object.values(state.products).reduce(
      (total, product) => total + product.count,
      0
    )
  );

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
        position="fixed"
        sx={{
          padding: "10px 0 0 0",
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <NavLink to="/">
            <img className={styles.icons} src={logo} alt="logo" />
          </NavLink>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={styles.navLink}
              >
                {link.label}
              </NavLink>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/checkout">
              <Badge
                badgeContent={totalCount}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#0D50FF",
                    color: "white",
                    fontSize: "14px",
                    top: 15,
                    right: 36,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                }}
              >
                <img className={styles.icons} src={shopIcon} alt="shopIcon" />
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
            backgroundColor: "white",
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
              sx={{ display: "block", textAlign: "center" }}
            >
              <NavLink to={link.path} className={styles.navLink}>
                {link.label}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
