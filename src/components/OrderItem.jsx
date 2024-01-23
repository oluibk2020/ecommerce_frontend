import { toast } from "react-toastify";
import { useContext } from "react";
import storeContext from "../context/storeContext";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";

function OrderItem() {
  //this should be replaced by the order item data which should be fetched using the id
  const {
    orderData,
    setIsAuth,
    orderFetcher,
    isLoading,
    setIsLoading,
    localTime,
    clockConverter,
    deliveryAddress,
    getDeliveryAddress
  } = useContext(storeContext);
  const navigate = useNavigate();
  //logout if not validated
  const token = localStorage.getItem("token");
  const { isExpired } = useJwt(token);
  const isEmpty = Object.keys(orderData).length === 0;

  //vat
  let VAT = 0
  
  //params
  const params = useParams();

  useEffect(() => {
    try {
      if (isExpired || !token) {
        // Handle invalid or expired token
        navigate("/login");
        localStorage.removeItem("token");
        setIsAuth(false);

        return;
      }

      if (!isExpired) {
        setIsLoading(true);

        orderFetcher(params.id); //auto fetching of order
        
        //auto fetching of product at page load
         if (isEmpty === false) {
           setIsLoading(false);
           //VAT
            

           //set localTime
           clockConverter(orderData.order.createdAt);

           //get delivery address
           getDeliveryAddress(orderData.order.deliveryAddressId);
         }
      }
    } catch (error) {
      toast.error("Sorry! You need to Login");
    }
  }, [isEmpty]);

    
    if (isLoading) {
      return <Spinner />;
    }


  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Order Item Details
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {isExpired === true || Object.keys(orderData).length === 0
                ? null
                : orderData.products.map((product, index) => {
                    //map thru orders to get each product quantity
                    const order = orderData.order.orderItems.find(
                      (order) => order.productId === product.id
                    );

                    return (
                      <li className="flex items-center gap-4" key={product.id}>
                        <Link to={`/product/${product.id}`}>
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="h-16 w-16 rounded object-cover"
                          />
                        </Link>

                        <div>
                          <h3 className="text-sm text-gray-900">
                            {product.title.length > 50
                              ? product.title.substring(0, 50) + "..."
                              : product.title}
                          </h3>
                        </div>

                        <div className="flex flex-1 items-center justify-end gap-2">
                          <div className="py-5 px-4 rounded border-gray-200 bg-gray-50 text-center text-xs text-gray-600">
                            Qty- {order.quantity}
                          </div>

                          <div className="h-8 pt-2 px-4 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600">
                            Price - ₦{parseInt(product.price).toFixed(2)}
                          </div>
                          <div className="h-8 pt-2 px-4 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 font-bold">
                            Total- ₦
                            {parseInt(product.price * order.quantity).toFixed(
                              2
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="text-md font-semibold pb-3">
                    Delivery Details
                  </div>
                  <div className="flex justify-between">
                    <dt>Address</dt>
                    <dd>
                      {Object.keys(orderData).length === 0
                        ? null
                        : deliveryAddress.address}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Mobile Number</dt>
                    <dd>
                      {Object.keys(orderData).length === 0
                        ? null
                        : deliveryAddress.mobile}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Full name</dt>
                    <dd>
                      {Object.keys(orderData).length === 0
                        ? null
                        : `${deliveryAddress.firstName} ${deliveryAddress.lastName}`}
                    </dd>
                  </div>
                </dl>

                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="text-md font-semibold pb-3">
                    Transaction Details
                  </div>
                  <div className="flex justify-between">
                    <dt>Date of Transaction</dt>
                    <dd>
                      {Object.keys(orderData).length === 0 ? null : localTime}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Transaction status</dt>
                    <dd>
                      {Object.keys(orderData).length === 0
                        ? null
                        : orderData.order.transactionStatus}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Transaction method</dt>
                    <dd>
                      {Object.keys(orderData).length === 0
                        ? null
                        : orderData.order.paymentMethod}
                    </dd>
                  </div>
                </dl>

                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between font-medium">
                    <dt>VAT (7% of Total)</dt>
                    <dd>
                      ₦
                      {Object.keys(orderData).length === 0
                        ? null
                        : ((7.5 / 100) * orderData.order.totalAmount).toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>
                      ₦
                      {Object.keys(orderData).length === 0
                        ? null
                        : orderData.order.totalAmount.toFixed(2)}
                    </dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <Link
                    to="/orders"
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Back to all orders
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default OrderItem;
