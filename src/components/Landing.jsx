import React, { useEffect, useState } from "react";
import axiosInstance from "../client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import "../Stylesheet/Landing.css";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

const Landing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [user, setUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(
        "https://intern-task-api.bravo68web.workers.dev/api/products"
      );
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialize filtered products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch user information
  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(
        "https://intern-task-api.bravo68web.workers.dev/api/me"
      );
      const userName = response.data.user.sub.split("@")[0];
      setUser(userName);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProducts();
    fetchUser();
  }, []);

  // Fetch products whenever the searchTerm changes
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm)
        )
      );
    }
  }, [searchTerm, products]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <div className="pb-24 text-gray-800">
      <header className="h-1/5 py-8 text-center">
        <h1 className="text-4xl font-bold">Hello {user}</h1>
      </header>
      <div className="h-1/6 flex justify-center items-center">
        <input
          type="text"
          className="h-1/5 w-2/3 max-w-xl p-4 rounded-lg border-gray-700 border-2 text-gray-900"
          placeholder="Search for Items"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="px-8 py-8">
        <h2 className="h-1/6 text-2xl text-center mb-2 font-semibold">Product List</h2>
        <Swiper
          slidesPerView={4}
          grid={{ rows: 2 }}
          spaceBetween={16}
          pagination={{ clickable: true }}
          modules={[Grid, Pagination]}
          className="mySwiper"
        >
          {filteredProducts.map((product) => (
            <SwiperSlide
              key={product.id}
              className="h-1/4 w-1/6 p-4 mt-2 text-black bg-gray-200 rounded-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                className="h-1/4 object-center object-contain"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="h-1/6 text-lg font-semibold">{product.title}</div>
              <div className="flex items-center justify-between">
                <div className="h-1/3 text-sm">{product.id}</div>
                <div className="priceTag text-sm">${product.price}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Landing;
