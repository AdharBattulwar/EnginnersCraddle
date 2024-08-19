import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import axiosInstance from "../client";
import { useCookies } from 'react-cookie';

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
    <div className="w-full h-auto flex justify-center align-center pt-16">
      <div className="w-1/2 h-1/2 p-10 my-6 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
        <h1 className="flex justify-center text-2xl font-bold">
          Login To Your Account
        </h1>
        <div className="flex flex-col h-full mt-4 mb-2 justify-center align-center">
          <form
            onSubmit={handleSubmit}
            method="post"
            className="flex flex-col w-full h-full justify-center align-center gap-4 pt-4"
          >
            <input
              type="email"
              className="rounded-md outline-none px-4 py-2 border-2 border-gray-200 hover:bg-gray-200"
              name="Email"
              required
              placeholder="Email Address"
            />
            <input
              type="password"
              className="rounded-md outline-none px-4 py-2 border-2 border-gray-200 hover:bg-gray-200"
              name="Password"
              required
              placeholder="Password"
            />
            <div className="flex justify-center">
              <input
                type="submit"
                value="Login"
                className="px-4 py-2 bg-blue-500 text-white rounded-xl w-1/2 mt-4 hover:border-blue-200"
              />
            </div>
            <div className="flex justify-between mt-1">
              <div>
                Don't Have An Account?
                <Link to="/registration" className="text-blue-800 font-bold">
                  &nbsp;Sign Up
                </Link>
              </div>
              <div>
                <a
                  href="/forgotPassword"
                  className="text-gray-400 font-bold hover:text-gray-600"
                >
                  &nbsp;Forgot Password!
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
