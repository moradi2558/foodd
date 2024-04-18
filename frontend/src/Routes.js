import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Order from "./pages/Order/Order";
import Products from "./pages/Products/Products";
import Register from "./pages/Register/Register";
import UserLoggedInPrivate from "./components/Private/UserLoggedInPrivate";
import OrderPrivate from "./components/Private/OrderPrivate";
import SearchResult from "./pages/SearchResult/SearchResult";
const routes = [
  { path: "/", element: <Home /> },
  {
    path: "/login",
    element: (
      <UserLoggedInPrivate>
        <Login />
      </UserLoggedInPrivate>
    ),
  },
  {
    path: "/register",
    element: (
      <UserLoggedInPrivate>
        <Register />
      </UserLoggedInPrivate>
    ),
  },
  { path: "/foods/:categoryName/:page", element: <Products /> },
  { path: "/cart", element: <Cart /> },
  {
    path: "/order",
    element: (
      <OrderPrivate>
        <Order />
      </OrderPrivate>
    ),
  },
  {
    path: "/search-result/:searchValue",
    element: <SearchResult />,
  },
];

export default routes;
