import { Button } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

interface IFormInput {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: IFormInput) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    const toastId = toast.loading("Logging in");
    
      const res = await login(userInfo)
        .unwrap()
        .catch((error) => {
          if (error.status === 404) {
            toast.error(error.data.message, { id: toastId, duration: 2000 });
          }
        });
      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success(`Logged in, Welcome ${res.data.name}`, {
        id: toastId,
        duration: 2000,
      });
      navigate("/home");
  };

  return (
    <div data-aos="zoom-in" className="flex items-center h-[100vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:w-96 mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md"
      >
        <div className="mb-4">
          <h1 className="text-3xl mb-8 font-bold">LOG IN</h1>
          <label className="block mb-1 font-bold text-gray-700">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block mb-1 font-bold text-gray-700">Password</label>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-12 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <p className="mb-2">Haven't Signed up to Real-Campers yet ?</p>
        <NavLink to={"/signup"}>
          <Button className="mb-4">Sign Up</Button>
        </NavLink>
        <Button
          size="large"
          htmlType="submit"
          type="primary"
          className="font-bold"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Signin;
