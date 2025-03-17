import Banner from "../components/Banner/Banner";
import Categories from "../components/Categories/Categories";
import DiscountForm from "../components/DiscountForm/DiscountForm";
import Products from "../components/Products/Products";

export default function Home() {
  return (
    <main>
      <Banner />
      <Categories />
      <DiscountForm />
      <Products />
    </main>
  );
}
