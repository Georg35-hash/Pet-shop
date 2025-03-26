import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Footer from "../src/components/Footer/Footer";
import Header from "../src/components/Header/Header";
import Home from "../src/pages/Home";
import CheckOut from "../src/pages/CheckOut/CheckOut";
import CategoriesPage from "../src/pages/AllCategoriesPage/AllCategories";
import AllProducts from "../src/pages/AllProducts/AllProducts";
import NotFoundPage from "../src/pages/NotFoundPage/NotFoundPage";
import ProductPage from "../src/pages/ProductPage/ProductPage";
import useProductStore from "../src/zustand/stores/products";
import useCategoryStore from "../src/zustand/stores/categories";
import { useEffect } from "react";
import AllSales from "../src/pages/AllSales/AllSales";
import Category from "../src/pages/Category/Category";
import AnimationProvider from "./hooks/AnimationProvider";
import "../src/styles/global.css";
import useThemeMode from "./hooks/useThemeMode";

export default function App() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);

  useEffect(() => {
    (async () => {
      await fetchProducts();
      await fetchCategories();
    })();
  }, [fetchProducts, fetchCategories]);

  const { theme, toggleTheme, mode } = useThemeMode();

  return (
    <Router>
      <AnimationProvider threshold={0.02}>
        <ThemeProvider theme={theme}>
          <Box sx={{ margin: "0 auto", maxWidth: "1440px" }}>
            <CssBaseline />
            <Header toggleTheme={toggleTheme} mode={mode} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:categoryId" element={<Category />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/products/:productId" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/allsales" element={<AllSales />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </Box>
        </ThemeProvider>
      </AnimationProvider>
    </Router>
  );
}
