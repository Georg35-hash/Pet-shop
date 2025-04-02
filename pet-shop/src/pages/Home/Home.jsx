import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import DiscountForm from "../../components/DiscountForm/DiscountForm";
import Products from "../../components/Products/Products";
import LoadingErrorHandler from "../../components/LoadingErrorHandler/LoadingErrorHandler";
import useCategoryStore from "../../zustand/stores/categories";

export default function Home() {
  const { loading, error, categories } = useCategoryStore();

  const isDataFetching = loading || (categories.length === 0 && !error);

  return (
    <main>
      <LoadingErrorHandler loading={isDataFetching} error={error} />
      {!isDataFetching && (
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
