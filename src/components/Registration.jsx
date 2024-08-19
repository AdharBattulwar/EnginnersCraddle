import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Stylesheet/Registration.css"

function Registration() {
    const navigate = useNavigate();
  const getRegistered = async (e) => {
    const formData = new FormData(e.target);
        // console.log(formData.get("Email"))
        const email = formData.get("Email")
        const Password = formData.get("Password")
        localStorage.setItem("Email",email)
        const Data = {
            email:email,
            password:Password
        }

        axios.post('https://intern-task-api.bravo68web.workers.dev/auth/signup', Data)
          .then(function (response) {
            const result = response.data.data.result
            if(result==="OK"){
                navigate('/login')
            }
            else{
                window.alert("Sorry Something Went Wrong ")
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        e.preventDefault();
    }

  return (
    <div className="RegistrationWrapper w-full h-full pr-20 pt-16 flex justify-end align-center">
      <div className="absolute w-1/3 h-5/6 py-10 px-6 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
        <h1 className="relative h-auto w-full flex justify-center text-2xl font-bold">
          Register For Your Account
        </h1>
        <div className="relative h-full w-full flex flex-col mt-5 justify-center align-center">
          <form
            onSubmit={getRegistered}
            method="post"
            className="relative flex flex-col w-full h-full justify-center align-center gap-4"
          >
            <input
              type="email"
              className="relative h-10 rounded-md outline-none px-4 py-2 border-2 border-gray-200 hover:border-blue-200"
              name="Email"
              placeholder="Email Address"
            />
            <input
              type="password"
              className="relative h-10 rounded-md outline-none px-4 py-2 border-2 border-gray-200 hover:border-blue-200"
              name="Password"
              placeholder="Password"
            />
            <div className="realtive h-10 flex justify-center">
              <input
                type="submit"
                value="Sign Up"
                className="relative h-10 px-4 py-2 bg-[#779341] rounded-xl w-1/2 hover:bg-[#789341c2] hover:border-blue-200"
              />
            </div>
            <div className="realtive h-auto w-full flex items-center justify-center mt-20">
              Already Have An Account?
              <Link to="/login" className="w-1/2 flex items-center justify-center text-blue-800 font-bold">
                &nbsp;Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
