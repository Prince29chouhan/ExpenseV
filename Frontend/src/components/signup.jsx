import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import signupImg from "../../public/signup.png";
import "../index.css";
import "../../public/style/signup.css";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("signup"); // Changed to handle signup and register
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const onSubmit = async (data) => {
    try {
      // Use the appropriate endpoint for signup
      const res = await axios.post("http://localhost:5000/api/users/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      toast.success("Account created successfully!");

      // Save user data to local storage
      localStorage.setItem("User", JSON.stringify(res.data.user_id));

      // Redirect to dashboard
      navigate("/login");
    } catch (error) {
      toast.error("Error: " + error.message, {
        style: {
          backgroundColor: "#FFE344",
        },
      });
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Navbar />
      <div className="mx-auto md:px-20 px-4 flex flex-col md:flex-row banner">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36 z-10 relative">
          <div className="shrink-0">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              {/* Tab for signup and Register */}
              <div className="founder mb-8">
                <div
                  className={`FI_box for-investors justify-center  ${activeTab === "login" ? "live" : ""}`}
                  onClick={() => {
                    toggleTab("login");
                    navigate("/login");
                  }}
                >
                  <p className="text-4xl">login</p>
                </div>
                <div
                  className={`FI_box for-investors justify-center ${activeTab === "signup" ? "live" : ""}`}
                  onClick={() => {
                    toggleTab("signup");
                  }}
                >
                  <p className="text-4xl">SignUp</p>
                </div>
              </div>

              <h1 className="text-white text-4xl font-Montserrat">
                Welcome to Expense Tracker!
              </h1>
              <div className="text-[#ffffff80] font-Montserrats">
                Log In to access your financial data in a few easy steps.
              </div>

              <div className="form-control mt-6 w-[100%] border-none">
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="signup-username px-3 py-2  border-none flex items-center text-white"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="form-control  w-[100%] border-none">
                <input
                  type="text"
                  placeholder="Enter your Email"
                  className="signup-email px-3 py-2  border-none flex items-center text-white"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="relative  w-[100%]">
                <input
                  className="px-3 py-2 signup-pass border-none flex items-center text-white"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z" />
                    </svg>
                  )}
                </button>
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="form-control mt-6 w-[100%]">
                <button className="bg-[#FFE344] signup-btn hover:bg-[#f2d846] text-black">
                  SignUp
                </button>
              </div>
              <div className="flex">
                <label className="label w-1/2 justify-start text-[#ffffff80]">
                  <input
                    type="checkbox"
                    className="me-3 w-5 h-5 bg-[#2D3250]"
                  />{" "}
                  Remember password?
                </label>

                <label className="label w-1/2 justify-end text-[#ffffff80]">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div>
                <span className="text-[#ffffff80] font-Montserrat">
                  Already have an account?{" "}
                  <a href="/login" className="font-Montserrat text-[#FFE344]">
                    Login
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>

        <div className="order-1 w-full mt-20 md:w-1/2 relative">
          <div id="image-zoom" className="signup-img text-center text-[20px]">
            <img
              src={signupImg}
              id="image-zoom-wrapper"
              className="md:w-[600px] md:h-[450px] md:ml-12"
              alt="signup Image"
              data-tilt
            />
            <span className="text-yellow-400 ms-20">Get Your Expense Sorted</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
