import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { useContext } from "react";
import storeContext from "../context/storeContext";

function Checkout() {
  const { isLoading, setIsLoading, login } = useContext(storeContext);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    delivery_first_name: "",
    delivery_last_name: "",
    delivery_email: "",
    delivery_address: "",
    delivery_phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("")

  function selectPayment(e) {
    setPaymentMethod(e.target.value);
  }

  const {
    delivery_address,
    delivery_first_name,
    delivery_last_name,
    delivery_email,
    delivery_phone,
    first_name,
    last_name,
    email,
    phone,
    password,
    password_confirmation,
  } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();

    if (password !== password_confirmation) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        first_name,
        last_name,
        email,
        password,
      };
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="bg-gray-100">
      <header className="text-center pt-8">
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
          CheckOut Page
        </h1>
      </header>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <div className="max-w-xl text-lg">
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt=""
                    className="h-16 w-16 rounded object-cover"
                  />

                  <div>
                    <h3 className="text-sm text-gray-900">Basic Tee 6-Pack</h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline">Size:</dt>
                        <dd className="inline">XXS</dd>
                      </div>

                      <div>
                        <dt className="inline">Color:</dt>
                        <dd className="inline">White</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <form>
                      <label htmlFor="Line3Qty" className="sr-only">
                        {" "}
                        Quantity{" "}
                      </label>

                      <input
                        type="number"
                        min="1"
                        defaultValue="2"
                        id="Line3Qty"
                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    </form>
                    <div className="h-8 pt-2 px-4 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600">
                      £500
                    </div>

                    <button className="text-gray-600 transition hover:text-red-600">
                      <span className="sr-only">Remove item</span>

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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              </ul>
              <div className="mt-3 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-40 max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>£250</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>VAT</dt>
                      <dd>£20</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>Discount</dt>
                      <dd>-£20</dd>
                    </div>

                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>£1250</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form action="" className="space-y-4" onSubmit={onSubmit}>
              {!login ? (
                <div>
                  <h1 className=" text-gray-900 text-base">
                    Let's create an account for you
                  </h1>
                  <div>
                    <label className="sr-only" htmlFor="first_name">
                      First Name
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="First Name"
                      type="text"
                      id="first_name"
                      value={first_name}
                      onChange={onChange}
                      name="first_name"
                      required
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="last_name">
                      Last Name
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Last Name"
                      type="text"
                      id="last_name"
                      value={last_name}
                      onChange={onChange}
                      name="last_name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Email address"
                        type="email"
                        id="email"
                        value={email}
                        onChange={onChange}
                        name="email"
                        required
                      />
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Phone Number"
                        type="text"
                        pattern="[0-9]{11}"
                        id="phone"
                        value={phone}
                        onChange={onChange}
                        name="phone"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={onChange}
                        name="password"
                        required
                      />
                    </div>

                    <div>
                      <label
                        className="sr-only"
                        htmlFor="password_confirmation"
                      >
                        Password confirmation
                      </label>
                      <input
                        required
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Password Confirmation"
                        type="password"
                        value={password_confirmation}
                        onChange={onChange}
                        name="password_confirmation"
                        id="password_confirmation"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              <div>
                <h1 className=" text-gray-900 text-base py-4">
                  Kindly fill in the delivery details
                </h1>

                <div>
                  <label className="sr-only" htmlFor="delivery_first_name">
                    First Name
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="First Name"
                    type="text"
                    id="delivery_first_name"
                    value={delivery_first_name}
                    onChange={onChange}
                    name="delivery_first_name"
                    required
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="delivery_last_name">
                    Last Name
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Last Name"
                    type="text"
                    id="delivery_last_name"
                    value={delivery_last_name}
                    onChange={onChange}
                    name="delivery_last_name"
                    required
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="delivery_address">
                    Delivery Address
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Full Delivery Address"
                    type="text"
                    value={delivery_address}
                    onChange={onChange}
                    id="delivery_address"
                    name="delivery_address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="delivery_email">
                      Email
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Email address"
                      type="email"
                      id="delivery_email"
                      value={delivery_email}
                      onChange={onChange}
                      name="delivery_email"
                      required
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="delivery_phone">
                      Phone
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Phone Number"
                      type="text"
                      pattern="[0-9]{11}"
                      value={delivery_phone}
                      onChange={onChange}
                      name="delivery_phone"
                      id="delivery_phone"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h1 className=" text-gray-900 text-base py-4">
                  Select your payment Method
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                <div>
                  <input
                    className="peer sr-only"
                    id="option1"
                    type="radio"
                    tabIndex="-1"
                    name="option"
                    defaultValue="paystack"
                    onClick={selectPayment}
                  />

                  <label
                    htmlFor="option1"
                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                    tabIndex="0"
                  >
                    <span className="text-sm"> PayStack </span>
                  </label>
                </div>

                <div>
                  <input
                    className="peer sr-only"
                    id="option2"
                    type="radio"
                    tabIndex="-1"
                    name="option"
                    required
                    defaultValue="flutterwave"
                    onClick={selectPayment}
                  />

                  <label
                    htmlFor="option2"
                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                    tabIndex="0"
                  >
                    <span className="text-sm"> Flutterwave </span>
                  </label>
                </div>
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  We will create an account when you make payment, and so you
                  agree to our
                  <a href="#" className="text-gray-700 underline">
                    {" "}
                    terms and conditions{" "}
                  </a>
                  and
                  <a href="#" className="text-gray-700 underline">
                    {" "}
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-pink-600 px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Checkout;
