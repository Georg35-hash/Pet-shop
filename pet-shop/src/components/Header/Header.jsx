import { Link, NavLink } from "react-router-dom";

import styles from "../Header/Header.module.css";
import logo from "../../assets/header/logo.svg";
import shopIcon from "../../assets/header/shop-icon.svg";
import useShoppingCartStore from "../../zustand/stores/shoppingCart";
import { Badge } from "@mui/material";

export default function Header() {
  // Watch changing in products, to recount totalCount
  const totalCount = useShoppingCartStore((state) =>
    Object.values(state.products).reduce(
      (total, product) => total + product.count,
      0
    )
  );

  return (
    <header>
      <nav>
        <div className={styles.iconsContainer}>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#0D50FF" : "black",
              textDecoration: "none",
            })}
            to="/"
          >
            <img className={styles.icons} src={logo} alt="logo" />
          </NavLink>
        </div>
        <ul>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#0D50FF" : "black",
                textDecoration: "none",
              })}
              to="/"
            >
              Main Page
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#0D50FF" : "black",
                textDecoration: "none",
              })}
              to="/categories"
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#0D50FF" : "black",
                textDecoration: "none",
              })}
              to="/products"
            >
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#0D50FF" : "black",
                textDecoration: "none",
              })}
              to="/allsales"
            >
              All Sales
            </NavLink>
          </li>
        </ul>
        <div className={styles.iconsContainer}>
          <Link to="/checkout">
            <Badge
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#0D50FF",
                  color: "white",
                  width: 26,
                  height: 26,
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  right: 35,
                  top: 20,
                },
              }}
              badgeContent={totalCount}
              color="primary"
            >
              <img className={styles.icons} src={shopIcon} alt="shopIcon" />
            </Badge>
          </Link>
        </div>
      </nav>
    </header>
  );
}
