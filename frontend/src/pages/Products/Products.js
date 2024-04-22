import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Products.css";
import FoodBox from "../../components/FoodBox/FoodBox";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Link, useParams, useNavigate } from "react-router-dom";
import apiRequests from "../../services/configs";
import { toast } from "react-toastify";
const Products = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [sort, setSort] = useState("default");
  const [foods, setFoods] = useState([]);
  const [sortedFoods, setSortedFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shownFoods, setShownFoods] = useState([]);
  const [isShowLoader, setIsShowLoader] = useState(true);

  useEffect(() => {
    if (categoryName === "all") {
      apiRequests
        .get("/home/")
        .then((res) => {
          setFoods(res.data.food);
          setSortedFoods(res.data.food);
          setCategories(res.data.category);
          setIsShowLoader(false);
        })
        .catch(() => {
          toast.error("خطایی رخ داده است", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        });
    } else {
      apiRequests
        .get(`/home/food/${categoryName}`)
        .then((res) => {
          if (res.data.food.length) {
            setFoods(res.data.food);
            setSortedFoods(res.data.food);
            setCategories(res.data.category);
            setIsShowLoader(false);
          } else {
            navigate("/foods/all/1");
          }
        })
        .catch(() => {
          navigate("/foods/all/1");
        });
    }
    if (!shownFoods.length) {
      navigate(`/foods/${categoryName}/1`);
    }
  }, [categoryName]);

  useEffect(() => {
    switch (sort) {
      case "default":
        setSortedFoods(foods);
        break;
      case "cheap":
        const cheapestFoods = [...foods].sort((item1, item2) => {
          const item1Price = item1.price - (item1.price * item1.discount) / 100;
          const item2Price = item2.price - (item2.price * item2.discount) / 100;
          return item1Price - item2Price;
        });
        setSortedFoods(cheapestFoods);
        break;

      case "expensive":
        const expensiveFoods = [...foods].sort((item1, item2) => {
          const item1Price = item1.price - (item1.price * item1.discount) / 100;
          const item2Price = item2.price - (item2.price * item2.discount) / 100;
          return item2Price - item1Price;
        });
        setSortedFoods(expensiveFoods);
        break;
      default: {
        setSortedFoods(foods);
      }
    }
  }, [sort, foods]);

  return (
    <>
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 2, title: "محصولات", to: "foods/1" },
        ]}
      />
      {isShowLoader ? (
        <Loader />
      ) : (
        <>
          <div className="tw-mt-16 tw-mb-96" style={{ direction: "rtl" }}>
            <div className="md:tw-flex tw-items-start">
              <div className="tw-mx-5 md:tw-ml-0  tw-mb-5 md:tw-w-5/12 lg:tw-w-4/12 xl:tw-w-3/12 2xl:tw-w-2/12 md:tw-sticky tw-top-32">
                <div className="sort tw-mb-4">
                  <div className="divSelect tw-relative tw-w-fit">
                    <select
                      className="orderby tw-shadow-md"
                      onChange={(event) => setSort(event.target.value)}
                    >
                      <option value="default">مرتب‌سازی پیش‌ فرض</option>
                      <option value="cheap">مرتب‌سازی بر اساس ارزانترین</option>
                      <option value="expensive">
                        مرتب‌سازی بر اساس گرانترین
                      </option>
                    </select>
                  </div>
                </div>
                <div className="category tw-shadow-lg tw-p-4 tw-text-sm tw-font-medium tw-rounded-xl tw-space-y-3 tw-w-full">
                  <Link
                    to="/foods/all/1"
                    className={`tw-block tw-w-full tw-text-right tw-p-2 tw-rounded-md ${
                      categoryName == "all" && "tw-bg-gray-300"
                    }`}
                  >
                    همه دسته بندی ها
                  </Link>
                  {categories.map((category) => (
                    <Link
                      to={`/foods/${category.id}/1`}
                      key={category.id}
                      className={`tw-block tw-w-full tw-text-right tw-p-2 tw-rounded-md ${
                        categoryName == category.id && "tw-bg-gray-300"
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="products tw-px-5 tw-flex tw-flex-wrap tw-justify-around xl:tw-justify-start md:tw-w-7/12 lg:tw-w-8/12 xl:tw-w-9/12 2xl:tw-w-10/12">
                {shownFoods.map((food) => (
                  <FoodBox
                    {...food}
                    key={food.id}
                    className="tw-w-10/12 sm:tw-w-5/12 md:tw-w-9/12 lg:tw-w-5/12 xl:tw-w-4/12 2xl:tw-w-3/12 tw-mb-10"
                  />
                ))}
              </div>
            </div>
            <Pagination
              items={sortedFoods}
              itemsCount={9}
              pathname={`/foods/${categoryName}`}
              setShownItems={setShownFoods}
            />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
export default Products;
