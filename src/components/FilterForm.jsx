import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useContext, useState,useEffect } from "react";
import storeContext from "../context/storeContext";

function FilterForm() {
  const { isLoading,AllProductFetcher, setIsLoading, categoryProductFetcher,currentPage, queryProduct, setTotalPages } =
    useContext(storeContext);

  //form data
  const [formData, setFormData] = useState({
    filterPriceFrom: "",
    filterPriceTo: "",
    filterProductName: "",
    categoryId: "",
  });

  //set categoryId
  const [categoryId, setCategoryId] = useState("");

  const { filterPriceFrom, filterPriceTo, filterProductName } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  //set category in filter for searching in shop
  function selectCategory(e) {
    categoryProductFetcher(e.target.value);
  }

  function filterCategory(e) {
    setCategoryId(e.target.value);
  }

  //on submit form for filtering Price and category
  function onSubmitSearch(e) {
    e.preventDefault();

    queryProduct(categoryId, filterPriceTo, filterPriceFrom, filterProductName);
    //filterCategory, filterPriceFrom,filterPriceTo, filterproductname
    //remember filterPrices are all in string format
  }

  //query products on current page change. this loads the next page
  useEffect(() => {
    if (filterPriceTo.trim().length === 0 || filterPriceFrom.trim().length === 0 || categoryId.trim().length === 0 || filterProductName.trim().length === 0) {
      return
    } else {

      queryProduct(categoryId, filterPriceTo, filterPriceFrom, filterProductName);
    }
  }, [currentPage]);

  //reseting price in filter
  function resetPriceSearch(e) {
    setFormData({
      filterPriceFrom: "",
      filterPriceTo: "",
      filterProductName: "",
    });
    setTotalPages(1)
    AllProductFetcher()
  }

  return (
    <div className="mt-8 flex justify-between">
      <div className="relative">
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span className="text-sm font-medium"> Filter </span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0">
            <div className=" rounded border border-gray-200 bg-white w-80">
              <header className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-700">
                  {" "}
                  Example: Versace from ₦300 to ₦600{" "}
                </span>

                <button
                  type="button"
                  onClick={resetPriceSearch}
                  className="text-sm text-gray-900 underline underline-offset-4"
                >
                  Reset
                </button>
              </header>

              <div className="border-t border-gray-200 p-4">
                <form
                  className="flex justify-between flex-col gap-4"
                  onSubmit={onSubmitSearch}
                >
                  <label htmlFor="FilterProduct" className="items-center gap-2">
                    <input
                      type="text"
                      id="FilterProduct"
                      placeholder="Product name"
                      required
                      onChange={onChange}
                      value={filterProductName}
                      name="filterProductName"
                      className="rounded-md border-gray-200 shadow-sm sm:text-sm w-full form-control h-10"
                    />
                  </label>

                  <label
                    htmlFor="FilterPriceFrom"
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm text-gray-600">$</span>

                    <input
                      type="number"
                      id="FilterPriceFrom"
                      placeholder="From"
                      required
                      className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm h-10"
                      onChange={onChange}
                      value={filterPriceFrom}
                      name="filterPriceFrom"
                    />
                  </label>

                  <label
                    htmlFor="FilterPriceTo"
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm text-gray-600">$</span>

                    <input
                      type="number"
                      id="FilterPriceTo"
                      placeholder="To"
                      required
                      onChange={onChange}
                      value={filterPriceTo}
                      name="filterPriceTo"
                      className="rounded-md border-gray-200 shadow-sm sm:text-sm w-full form-control h-10"
                    />
                  </label>

                  <select
                    id="SortBy"
                    required
                    onClick={filterCategory}
                    className="h-10 rounded border-gray-300 text-sm w-16 border"
                  >
                    <option value="2">Wristwatches</option>
                    <option value="1">Shirts</option>
                  </select>

                  <button
                    type="submit"
                    className="btn btn-secondary text-sm btn-sm"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </details>
      </div>
      <div className="sm:block">
        <label htmlFor="SortBy" className="sr-only">
          SortBy
        </label>

        <select
          id="SortBy"
          onClick={selectCategory}
          className="h-10 rounded border-gray-300 text-sm"
        >
          <option value="3">All</option>
          <option value="2">Wristwatches</option>
          <option value="1">Shirts</option>
        </select>
      </div>
    </div>
  );
}
export default FilterForm;
