import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Product from "./components/Product";
import Login from "./components/Login";
import Register from "./pages/Register";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { StoreProvider } from "./context/storeContext";
import Logout from "./components/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./components/Orders";
import OrderItem from "./components/OrderItem";
function App() {
  return (
    <Router>
      <StoreProvider>
        <Navbar />
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/order/:id" element={<OrderItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </StoreProvider>
      <Footer />
    </Router>
  );
}

export default App;
