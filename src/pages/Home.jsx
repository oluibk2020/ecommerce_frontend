import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import storeContext from "../context/storeContext";

function Home() {
  const { storeList, AllProductFetcher, categoryProductFetcher } =
    useContext(storeContext);

   useEffect(() => {
     AllProductFetcher();
   }, []);

   function shirtCategoryHandler() {
    categoryProductFetcher(1)
   }
   function watchCategoryHandler() {
    categoryProductFetcher(2)
   }
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid place-content-center rounded bg-gray-100 p-6 sm:p-8">
              <div className="mx-auto max-w-md text-center lg:text-left">
                <header>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                    Reddy Clothings
                  </h2>

                  <p className="mt-4 text-gray-500">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quas rerum quam amet provident nulla error!
                  </p>
                </header>

                <Link
                  to="/shop"
                  className="mt-8 inline-block rounded border border-gray-900 bg-gray-900 px-12 py-3 text-sm font-medium text-white transition hover:shadow focus:outline-none focus:ring"
                >
                  Shop All
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2 lg:py-8">
              <ul className="grid grid-cols-2 gap-4">
                <li>
                  <Link
                    to="/shop"
                    onClick={shirtCategoryHandler}
                    className="group block"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt=""
                      className="aspect-square w-full rounded object-cover"
                    />

                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                        Lovely Tee-Shirts
                      </h3>

                      <p className="mt-1 text-sm text-gray-700">From ₦3500</p>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/shop"
                    onClick={watchCategoryHandler}
                    className="group block"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                      alt=""
                      className="aspect-square w-full rounded object-cover"
                    />

                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                        Beautiful Watches
                      </h3>

                      <p className="mt-1 text-sm text-gray-700">From ₦15000</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* {end of section} */}
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl mb-7">
          Featured Products
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {storeList.map((item) => {
            return (
              <li key={item.id}>
                <Link
                  to={`/product/${item.id}`}
                  className="group block overflow-hidden"
                >
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                  />

                  <div className="relative bg-white pt-3">
                    <h3 className=" text-base text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      {item.title.replace(/\b\w/g, (match) =>
                        match.toUpperCase()
                      )}
                    </h3>

                    <p className="mt-2">
                      <span className="sr-only"> Regular Price </span>

                      <span className="tracking-wider text-gray-900">
                        {" "}
                        ₦{Number(item.price).toLocaleString()} NGN{" "}
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default Home