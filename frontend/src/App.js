import { useNavigate, useRoutes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./context/AuthContext";
import routes from "./Routes";
import { useEffect, useState } from "react";
import apiRequests from "./services/configs";
function App() {
  const router = useRoutes(routes);
  const navigate = useNavigate();
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
    navigate("/");
  };

  const getCartUser = () => {
    if (localStorage.getItem("user")) {
      setToken(JSON.parse(localStorage.getItem("user")).token);
      apiRequests
        .get("/cart/cart/1/", {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        })
        .then((res) => {
          setIsLoggedIn(true);
          setCart({
            cart: [],
            totalPrice: 0,
            count: 0,
          });
          res.data.reduce((prevValue, currentValue) => {
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
          res.data.forEach((item) => {
            setCart((prev) => ({
              ...prev,
              count: prev.count + item.quantity,
            }));
          });
          setCart((prev) => ({
            ...prev,
            cart: res.data.reverse(),
          }));
        })
        .catch((err) => {
          if (err.response.status === 401) {
            logout();
          }
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
          limit={3}
          style={{ fontWeight: "bolder", fontSize: "16px" }}
        />
        {router}
      </AuthContext.Provider>
    </>
  );
}

export default App;
