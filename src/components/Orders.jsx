import Profile from "./Profile";
import { useContext } from "react";
import storeContext from "../context/storeContext";
import { Link } from "react-router-dom";

function Orders() {
  const { orderList, setOrderList } = useContext(storeContext)

  console.log(orderList.orders);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Profile />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Delivery address
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Date of Transaction
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Total Amount
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Transaction Status
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {orderList.orders.map((item, index) => {
              const convertedTime = new Date(item.createdAt).toLocaleString(
                "en-US",
                {
                  timeZone: "Africa/Lagos",
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                }
              )
              return (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.deliveryAddress.address}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {convertedTime}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ₦{item.totalAmount}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.transactionSuccessful ? "successful" : "failed"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <Link
                      to={`/order/${item.id}`}
                      className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                    >
                      View Order
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Orders;
