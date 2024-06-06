import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Landing from "../../components/Landing/Landing";
import Categories from "../../components/Categories/Categories";
import LastFoods from "../../components/LastFoods/LastFoods";
import HomeSection from "../../components/HomeSection/HomeSection";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import apiRequests from "../../services/configs";

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [isShowLoader, setIsShowLoader] = useState(true);
  useEffect(() => {
    apiRequests.get("/home/").then((res) => {
      setCategories(res.data.category);
      setFoods(res.data.food);
      setIsShowLoader(false);
    });
  }, []);
  return (
    <>
      <Navbar />
      {isShowLoader ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Landing />
          <Categories categories={categories} />
          <LastFoods foods={foods} />
          <HomeSection />
          <Footer />
        </>
      )}
    </>
  );
};

export default Index;
