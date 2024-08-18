import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

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
            console.log(result);
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
    <div className="w-full h-auto flex justify-center align-center">
      <div className="w-1/2 h-1/2 p-10 my-6 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
        <h1 className="flex justify-center text-2xl font-bold">
          Register For Your Account
        </h1>
        <div className="flex flex-col h-auto mt-5 justify-center align-center">
          <form
            onSubmit={getRegistered}
            method="post"
            className="flex flex-col w-full h-full justify-center align-center gap-4 pt-4"
          >
            <input
              type="email"
              className="rounded-md outline-none px-4 py-2 border-2 border-gray-200 hover:border-blue-200"
              name="Email"
              placeholder="Email Address"
            />
            <input
              type="password"
              className="rounded-md outline-none px-4 py-2 border-2 border-gray-200 hover:border-blue-200"
              name="Password"
              placeholder="Password"
            />
            <div className="flex justify-center">
              <input
                type="submit"
                value="Sign Up"
                className="px-4 py-2 bg-gray-100 rounded-xl w-1/2 mt-4 hover:bg-gray-200 hover:border-blue-200"
              />
            </div>
            <div className="flex mt-1">
              Already Have An Account?
              <a href="/login" className="text-blue-800 font-bold">
                &nbsp;Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
