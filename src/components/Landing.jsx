import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import "../Stylesheet/Landing.css";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { useCookies } from 'react-cookie';


const Landing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [user, setUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cookies, setCookie] = useCookies(['token']);

  const axiosInstance = axios.create({
    baseURL: 'https://intern-task-api.bravo68web.workers.dev/api/',
    timeout: 1000,
    headers: {'Authorization': `Bearer ${cookies.token}`}
  });

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
      await axiosInstance.get(
        "https://intern-task-api.bravo68web.workers.dev/api/me"
      ).then((response)=>{
        const userName = response.data.user.sub.split("@")[0];
        setUser(userName);
      })
      .catch((error=>{
        console.log(error)
      }))
    } ;

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
      <header className="h-1/5 py-8 text-center bg-gray-900 text-white">
        <h1 className="text-5xl font-bold">Welcome, {user}</h1>
      </header>
      <div className="h-1/6 flex justify-center items-center mt-8">
        <input
          type="text"
          className="h-12 w-2/3 max-w-xl p-4 rounded-lg border-gray-300 shadow-sm text-gray-900 focus:ring-2 focus:ring-blue-500"
          placeholder="Search for Items"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="px-8 py-8 bg-gray-100 rounded-lg mt-8">
        <h2 className="h-1/6 text-3xl text-center mb-6 font-bold text-gray-700">Product List</h2>
        <Swiper
          slidesPerView={4}
          grid={{ rows: 2 }}
          spaceBetween={24}
          pagination={{ clickable: true }}
          modules={[Grid, Pagination]}
          className="mySwiper"
        >
          {filteredProducts.map((product) => (
            <SwiperSlide
              key={product.id}
              className="relative h-full w-1/4 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                className="relative h-1/3 w-full object-contain mb-4"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="relative h-auto text-lg font-semibold text-gray-800">{product.title}</div>
              <div className="relative h-1/3 flex items-center justify-between mt-4">
                <div className="absolute w-1/2 flex items-center justify-start text-sm text-gray-600">ID: {product.id}</div>
                <div className="absolute flex items-center justify-center priceTag text-lg font-bold text-green-600">${product.price}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Landing;
