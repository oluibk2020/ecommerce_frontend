import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const storeContext = createContext();

export const StoreProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [storeList, setStoreList] = useState([]);

  const [productData, setProductData] = useState({});
  const [cartData, setCartData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orderList, setOrderList] = useState({
    firstName: "Yemi",
    orders: [
      {
        id: 2,
        totalAmount: 10411,
        paymentMethod: "flutterwave",
        transactionSuccessful: true,
        createdAt: "2023-12-19T19:16:59.441Z",
        userId: 1,
        deliveryAddressId: 1,
        orderItems: [
          {
            id: 1,
            productId: 11,
            quantity: 1,
            price: 800,
            orderId: 2,
          },
          {
            id: 2,
            productId: 9,
            quantity: 2,
            price: 3760,
            orderId: 2,
            createdAt: "2023-12-19T19:16:59.441Z",
            updatedAt: "2023-12-19T19:16:59.441Z",
          },
          {
            id: 3,
            productId: 12,
            quantity: 1,
            price: 1800,
            orderId: 2,
            createdAt: "2023-12-19T19:16:59.441Z",
            updatedAt: "2023-12-19T19:16:59.441Z",
          },
          {
            id: 4,
            productId: 10,
            quantity: 1,
            price: 290,
            orderId: 2,
            createdAt: "2023-12-19T19:16:59.441Z",
            updatedAt: "2023-12-19T19:16:59.441Z",
          },
        ],
        deliveryAddress: {
          address: "Kolapouiyh, afromedia, lagos",
        },
      },
      {
        id: 3,
        totalAmount: 2090,
        paymentMethod: "flutterwave",
        transactionSuccessful: true,
        createdAt: "2023-12-19T19:21:48.671Z",
        updatedAt: "2023-12-19T19:21:48.671Z",
        userId: 1,
        deliveryAddressId: 1,
        orderItems: [
          {
            id: 5,
            productId: 12,
            quantity: 1,
            price: 1800,
            orderId: 3,
            createdAt: "2023-12-19T19:21:48.671Z",
            updatedAt: "2023-12-19T19:21:48.671Z",
          },
          {
            id: 6,
            productId: 10,
            quantity: 1,
            price: 290,
            orderId: 3,
            createdAt: "2023-12-19T19:21:48.671Z",
            updatedAt: "2023-12-19T19:21:48.671Z",
          },
        ],
        deliveryAddress: {
          id: 1,
          address: "Kolapouiyh, afromedia, lagos",
          mobile: "090399193326",
          firstName: "Saheed",
          lastName: "Alliwo",
          createdAt: "2023-12-19T16:21:51.662Z",
          updatedAt: "2023-12-19T16:21:51.662Z",
          userId: 1,
        },
      },
    ],
  });

  //cart fetcher
  function cartFetcher() {
    const updatedCartData = cartData.map((cartItem) => {
      // Add a 'quantity' attribute with a default value of 1 to each cartItem
      return { ...cartItem, quantity: 1 };
    });
    setCartData(updatedCartData);
  }

  //add new product to cart
  const addNewProductToCart = (product) => {
    const productWithQty = { ...product, quantity: 1 };
    setCartData([...cartData, productWithQty]);
  };

  //increase product qty
  function increaseQty(productId) {
    // Check if the product with productId is already in the cart
    const productIndex = cartData.findIndex(
      (cartItem) => cartItem.id === productId
    );

    if (productIndex !== -1) {
      // If the product is in the cart, update its quantity
      const updatedCartData = cartData.map((cartItem, index) => {
        if (index === productIndex) {
          // Increase the quantity by 1 only if it's equal or greater than 1
          const updatedQuantity =
            (cartItem.quantity || 0) >= 1 ? (cartItem.quantity || 0) + 1 : 1;

          return { ...cartItem, quantity: updatedQuantity };
        }
        return cartItem;
      });

      // Update the cartData with the modified array
      setCartData(updatedCartData);
    }
  }

  //decrease product quantity
  //increase product qty
  function decreaseQty(productId) {
    console.log(productId);
    // Check if the product with productId is already in the cart
    const productIndex = cartData.findIndex(
      (cartItem) => cartItem.id === productId
    );

    if (productIndex !== -1) {
      // If the product is in the cart, update its quantity
      const updatedCartData = cartData
        .map((cartItem, index) => {
          if (index === productIndex) {
            // Decrease the quantity by 1 only if it's equal or greater than 1
            const updatedQuantity =
              (cartItem.quantity || 0) > 1 ? (cartItem.quantity || 0) - 1 : 0;

            // Return null to remove the item if the quantity becomes zero
            return updatedQuantity > 0
              ? { ...cartItem, quantity: updatedQuantity }
              : null;
          }
          return cartItem;
        })
        .filter(Boolean); // Filter out null values

      // Update the cartData with the modified array
      setCartData(updatedCartData);
    }
  }

  //fetch all products on app load
  useEffect(() => {
    AllProductFetcher();
  }, []);

  //fetch all products
  async function AllProductFetcher() {
    try {
      const response = await fetch("/products");
      const data = await response.json();

      setStoreList(data);
    } catch (error) {
      toast.error("We are unable to get all products at the moment");
    }
  }

  //fetch single product
  async function productFetcher(id) {
    try {
      const response = await fetch(`/products/${id}`);
      const data = await response.json();
      setProductData(data);
    } catch (error) {
      toast.error("We are unable to get this product at the moment");
    }
  }

  //fetch products of a category
  async function categoryProductFetcher(id) {
    try {
      const setId = Number(id);
      if (setId <= 2) {
        const response = await fetch(`/categories/${id}`);
        const data = await response.json();

        setStoreList(data);
      } else {
        return AllProductFetcher();
      }
    } catch (error) {
      toast.error(
        "We are unable to get products of this category at the moment"
      );
    }
  }

  //query products wih search
  async function queryProduct(categoryId, maxPrice, minPrice, productName) {
    try {
      const response = await fetch(
        `/products/s?categoryId=${categoryId}&maxPrice=${maxPrice}&minPrice=${minPrice}&name=${productName}&page=${currentPage}`
      );
      const data = await response.json();
      setStoreList(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Network error");
    }
  }

  //handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const contextObj = {
    login,
    setLogin,
    isLoading,
    setIsLoading,
    storeList,
    setStoreList,
    productData,
    productFetcher,
    categoryProductFetcher,
    AllProductFetcher,
    queryProduct,
    cartData,
    setCartData,
    addNewProductToCart,
    cartFetcher,
    increaseQty,
    decreaseQty,
    handlePageChange,
    currentPage,
    totalPages,
    setTotalPages,
    orderList,
    setOrderList,
  };

  return (
    <storeContext.Provider value={contextObj}>{children}</storeContext.Provider>
  );
};

export default storeContext;
