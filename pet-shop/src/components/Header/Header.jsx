import { Link, NavLink } from "react-router-dom";

import styles from "../Header/Header.module.css";
import logo from "../../assets/header/logo.svg";
import shopIcon from "../../assets/header/shop-icon.svg";
import useShoppingCartStore from "../../zustand/stores/shoppingCart";
import { Badge } from "@mui/material";

export default function Header() {
  // Watch changing in products, to recount totalCount it changed
  const totalCount = useShoppingCartStore((state) =>
    Object.values(state.products).reduce(
      (total, product) => total + product.count,
      0
    )
  );

  return (
    <header>
      <nav>
        <div className={styles.icons}>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#0D50FF" : "black",
              textDecoration: "none",
            })}
            to="/"
          >
            <img src={logo} alt="logo" />
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
              to="/sales"
            >
              All Sales
            </NavLink>
          </li>
        </ul>
        <div className={styles.icons}>
          <Link to="/checkout">
            <Badge badgeContent={totalCount} color="primary">
              <img src={shopIcon} alt="shopIcon" />
            </Badge>
          </Link>
        </div>
      </nav>
    </header>
  );
}
