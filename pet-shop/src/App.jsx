import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import CheckOut from "./pages/CheckOut";
import CategoriesPage from "./pages/CategoriesPage";
import AllProducts from "./pages/AllProducts";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import useProductStore from "./zustand/stores/products";
import useCategoryStore from "./zustand/stores/categories";
import { useEffect } from "react";
import AllSales from "./pages/AllSales";

export default function App() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);

  useEffect(() => {
    (async () => {
      await fetchProducts();
      await fetchCategories();
    })();
  }, [fetchProducts, fetchCategories]);

  return (
    <Router>
      <Box sx={{ margin: "0 auto", maxWidth: "1440px" }}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/allsales" element={<AllSales />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
}
