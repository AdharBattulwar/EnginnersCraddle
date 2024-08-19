import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import axiosInstance from "../client";
import { useCookies } from 'react-cookie';
import "../Stylesheet/Login.css"

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);

  const handleSubmit = async (e) => {
    const formData = new FormData(e.target);
    const email = formData.get("Email");
    const Password = formData.get("Password");
    const Data = {
      email: email,
      password: Password,
    };

    axios.post("https://intern-task-api.bravo68web.workers.dev/auth/login", Data)
      .then(function (response) {
        if(response.data.error){
          window.alert("Invalid Credentials")
        }
        else{
          const token = response.data.token;
          setCookie('token', token);
          navigate(`/landing`);
        }
      })
      .catch(function (error) {
        setError("Login failed. Please check your credentials.");
        console.error(error);
      });
    e.preventDefault();
  };

  return (
    <div className="LoginWrapper w-full h-full pr-20 flex justify-end align-center pt-16">
      <div className="relative w-1/3 h-5/6 py-10 px-6 my-6 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
        <h1 className="relative h-auto w-full flex items-center justify-center text-2xl font-bold">
          Login To Your Account
        </h1>
        <div className="relative flex flex-col h-full justify-center align-center">
          <form
            onSubmit={handleSubmit}
            method="post"
            className="relative h-full w-auto flex flex-col justify-center align-center gap-4 pt-4"
          >
            <input
              type="email"
              className="h-10 rounded-md outline-none px-4 py-2 border-2 border-gray-200 hover:bg-gray-200"
              name="Email"
              required
              placeholder="Email Address"
            />
            <input
              type="password"
              className="h-10 rounded-md outline-none px-4 py-2 border-2 border-gray-200 hover:bg-gray-200"
              name="Password"
              required
              placeholder="Password"
            />
            <div className="relative h-auto flex justify-center">
              <input
                type="submit"
                value="Login"
                className="h-10 px-4 py-2 bg-[#779341] text-white rounded-xl w-1/2 hover:border-blue-200"
              />
            </div>
            <div className="relative h-auto mt-8 flex justify-between">
              <div className="w-1/2">
                Don't Have An Account?
                <Link to="/registration" className="text-blue-800 font-bold">
                  &nbsp;Sign Up
                </Link>
              </div>
              <div className="w-1/2">
                <Link
                  to="/"
                  className="flex justify-center items-center text-gray-400 font-bold hover:text-gray-600"
                >
                  &nbsp;Forgot Password!
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
