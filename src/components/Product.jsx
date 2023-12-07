function Product() {
  return (
    <div className="container  my-7 mx-auto border-red-700 lg:flex">
      <a href="#" className="group relative block overflow-hidden w-96 mx-auto">
        <img
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt=""
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div className="relative border border-gray-100 bg-white p-6">
          <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
            {" "}
            New{" "}
          </span>

          <h3 className="mt-4 text-lg font-medium text-gray-900">Basic Tee Shirt</h3>

          <p className="mt-1.5 text-sm text-gray-700">$14.99</p>

          <form className="mt-4">
            <button className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
              Add to Cart
            </button>
          </form>
        </div>
      </a>
      <div className="hidden md:block w-1/2  py-10">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Product Description
        </h1>
        <div className="mt-3.5 text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos,
          consectetur libero magnam nemo alias officiis ipsam cumque! Natus
          commodi consequuntur ipsa! Reprehenderit sed quae tempora quibusdam
          amet recusandae modi placeat?
        </div>
      </div>
    </div>
  );
}
export default Product