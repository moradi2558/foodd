import { useRoutes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./context/AuthContext";
import routes from "./Routes";
import { useEffect, useState } from "react";
function App() {
  const router = useRoutes(routes);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState({
    cart: [],
    totalPrice: 0,
    count: 0,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify({ token }));
    getCartUser();
  };

  const logout = () => {
    setToken(null);
    setCart({
      cart: [],
      totalPrice: 0,
      count: 0,
    });
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  const getCartUser = () => {
    if (localStorage.getItem("user")) {
      setToken(JSON.parse(localStorage.getItem("user")).token);
      fetch("http://localhost:8000/cart/cart/1/", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setIsLoggedIn(true);
            return res.json();
          }
        })
        .then((result) => {
          console.log(result);
          setCart({
            cart: [],
            totalPrice: 0,
            count: 0,
          });
          result.reduce((prevValue, currentValue) => {
            let sumPrice =
              prevValue +
              (currentValue.food.price -
                (currentValue.food.price * currentValue.food.discount) / 100) *
                currentValue.quantity;
            setCart((prev) => ({
              ...prev,
              totalPrice: prev.totalPrice + sumPrice,
            }));
            return prevValue;
          }, 0);
          result.forEach((item) => {
            setCart((prev) => ({
              ...prev,
              count: prev.count + item.quantity,
            }));
          });
          setCart((prev) => ({
            ...prev,
            cart: result.reverse(),
          }));
        });
    } else {
      logout();
    }
  };

  useEffect(() => {
    getCartUser();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          token,
          cart,
          login,
          logout,
          getCartUser,
        }}
      >
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ fontWeight: "bolder", fontSize: "16px" }}
        />
        {router}
      </AuthContext.Provider>
    </>
  );
}

export default App;
