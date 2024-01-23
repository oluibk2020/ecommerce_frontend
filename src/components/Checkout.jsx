import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { useContext } from "react";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import storeContext from "../context/storeContext";
import NoCartFound from "../pages/NoCartFound";
import { useJwt } from "react-jwt";



function Checkout() {
  //logout if not validated
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);

  const navigate = useNavigate();

  const {
    cartData,
    setIsAuth,
    increaseQty,
    decreaseQty,
    isAuth,
    isLoading,
    setIsLoading,
    setCartData,
  } = useContext(storeContext);

  let totalPrice = 0;
  for (const product of cartData) {
    // Fetch the product price
    totalPrice += product.price * product.quantity;
  }
  let VAT = (7.5 / 100) * totalPrice;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    delivery_first_name: "",
    delivery_last_name: "",
    delivery_address: "",
    delivery_phone: "",
  });
  const REDDY_URL = process.env.REACT_APP_REDDY_URL;

  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    try {
      if (isExpired || !token) {
        // Handle invalid or expired token
        localStorage.removeItem("token");
        setIsAuth(false);
        navigate("/login");

        return;
      }

      if (!isExpired) {
        setIsLoading(true);
        setIsLoading(false)
      }

     
    } catch (error) {
      toast.error("Sorry! You need to Login");
    }
  }, []);


  //website url

  function selectPayment(e) {
    setPaymentMethod(e.target.value);
  }

  const {
    delivery_address,
    delivery_first_name,
    delivery_last_name,
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

   if (isLoading) {
     return <Spinner />;
   }

  //create delivery address
  async function createDeliveryAddress() {
    try {
      const response = await fetch(`${REDDY_URL}/delivery/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: delivery_address,
          firstName: delivery_first_name,
          lastName: delivery_last_name,
          mobile: delivery_phone,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        toast.success("Delivery created successfully");
        //clear form
        setFormData({
          delivery_first_name: "",
          delivery_last_name: "",
          delivery_address: "",
          delivery_phone: "",
        });

        //create order
        createOrder(data.id);

        return;
      } else {
        console.log(data);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //send cartitems and deliveryId to server
  async function createOrder(deliveryId) {
    try {
      const response = await fetch(`${REDDY_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          deliveryAddressId: deliveryId,
          cartItems: cartData,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        toast.success("Invoice has been created successfully");
        navigate("/orders");
        //navigate to flutterwave to make payment
        console.log("orderId", data.id);
        console.log("totalAmount", data.totalAmount);
        setCartData([]);

        return;
      } else {
        console.log(data);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    createDeliveryAddress();
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {cartData.length > 0 ? (
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
                    {cartData.map((product) => {
                      return (
                        <li
                          className="flex items-center gap-4"
                          key={product.id}
                        >
                          <Link to={`/product/${product.id}`}>
                            <img
                              src={product.imageUrl}
                              alt={product.title}
                              className="h-16 w-16 rounded object-cover"
                            />
                          </Link>

                          <div>
                            <h3 className="text-sm text-gray-900">
                              {product.title}
                            </h3>
                          </div>

                          <div className="flex flex-1 items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                increaseQty(product.id);
                              }}
                              className="text-gray-600 transition hover:text-pink-600"
                            >
                              <span className="sr-only">Add item</span>
                              <IoIosAddCircleOutline />
                            </button>
                            <div className="h-8 pt-2 px-4 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600">
                              {product.quantity}
                            </div>
                            <button
                              onClick={() => {
                                decreaseQty(product.id);
                              }}
                              className="text-gray-600 transition hover:text-pink-600"
                            >
                              <span className="sr-only">remove item</span>
                              <IoIosRemoveCircleOutline />
                            </button>

                            <div className="h-8 pt-2 px-4 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600">
                              {product.price}
                            </div>

                            <div className="h-8 pt-2 px-4 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 font-bold">
                              ₦{(product.quantity * product.price).toFixed(2)}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-3 flex justify-end border-t border-gray-100 pt-8">
                    <div className="w-40 max-w-lg space-y-4">
                      <dl className="space-y-0.5 text-sm text-gray-700">
                        <div className="flex justify-between">
                          <dt>Subtotal</dt>
                          <dd>₦{totalPrice.toFixed(2)}</dd>
                        </div>

                        <div className="flex justify-between">
                          <dt>VAT</dt>
                          <dd>₦{VAT.toFixed(2)}</dd>
                        </div>

                        <div className="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>₦{(totalPrice + VAT).toFixed(2)}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                <form action="" className="space-y-4" onSubmit={onSubmit}>
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
                    {/* <div>
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
                    </div> */}

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
                      We will create an account when you make payment, and so
                      you agree to our
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
      ) : (
        <NoCartFound />
      )}
    </>
  );
}
export default Checkout;
