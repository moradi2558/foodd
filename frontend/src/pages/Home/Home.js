import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Landing from "../../components/Landing/Landing";
import Categories from "../../components/Categories/Categories";
import LastFoods from "../../components/LastFoods/LastFoods";
import HomeSection from "../../components/HomeSection/HomeSection";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [isShowLoader, setIsShowLoader] = useState(true);
  useEffect(() => {
    fetch("http://localhost:8000/home/")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.category);
        setFoods(data.food);
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
