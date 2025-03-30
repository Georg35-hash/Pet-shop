import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import DiscountForm from "../../components/DiscountForm/DiscountForm";
import Products from "../../components/Products/Products";
import LoadingErrorHandler from "../../components/LoadingErrorHandler/LoadingErrorHandler";
import useCategoryStore from "../../zustand/stores/categories";

export default function Home() {
  const { loading, error } = useCategoryStore();

  return (
    <main>
      <LoadingErrorHandler loading={loading} error={error} />
      {!loading && !error && (
        <>
          <Banner />
          <Categories />
          <DiscountForm />
          <Products />
        </>
      )}
    </main>
  );
}
