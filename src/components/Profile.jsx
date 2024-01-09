import { useContext } from "react";
import storeContext from "../context/storeContext";

function Profile() {

  const { orderList, setOrderList } = useContext(storeContext);


  return (
    <div>
      <header className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="mt-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome Back, {orderList.firstName}!
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Your have ordered {orderList.orders.length} products so far from
              us! 🚀
            </p>
          </div>
        </div>
      </header>
    </div>
  );
}
export default Profile;
