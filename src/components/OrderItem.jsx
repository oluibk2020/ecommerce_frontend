import { toast } from "react-toastify"
import { useContext } from "react";
import storeContext from "../context/storeContext";
import { useState } from "react";
import { Link } from "react-router-dom";

function OrderItem() {
    //this should be replaced by the order item data which should be fetched using the id
  const { cartData } = useContext(storeContext);

  //calculation in each cart(multiply qty by price)

  let totalPrice = 0;
  for (const product of cartData) {
    // Fetch the product price
    totalPrice += product.price * product.quantity;
  }
  let VAT = (7.5 / 100) * totalPrice;


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
              {cartData.map((product, index) => {
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
                      <h3 className="text-sm text-gray-900">{product.title}</h3>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <div className="h-8 pt-2 px-4 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600">
                        {product.quantity}
                      </div>

                      <div className="h-8 pt-2 px-4 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600">
                        ₦{product.price}
                      </div>
                      <div className="h-8 pt-2 px-4 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 font-bold">
                        ₦{(product.quantity * product.price).toFixed(2)}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Date of Transaction</dt>
                    <dd>Tuesday, December 19, 2023 at 8:16:59 PM</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Delivery address</dt>
                    <dd>Kolapouiyh, afromedia, lagos</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Transaction status</dt>
                    <dd>successful</dd>
                  </div>
                </dl>

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