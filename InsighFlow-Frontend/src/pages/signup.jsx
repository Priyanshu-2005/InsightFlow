import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Box, Button, Container, TextField } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../utils/supabaseClient";
// import useHandleSignUp from "../hooks/useHandleSignUp";

function SignUpPage() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("ff", API_URL);
  const [signupData, setSignupData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    aadhaarNumber: "",
    createdAt: "",
    emailVerified: "",
  });
  const [token, setToken] = useState(
    localStorage.getItem("sb-xbwcvsgisrkvaaxasrpl-auth-token")
  );

  useEffect(() => {
    if (token) {
      toast.success("Login successful! Redirecting to dashboard....");
      setSuccessMessage("Logging in....");
      setTimeout(() => {
        window.location.href = "/insightflow/app";
      }, 500);
    }
  }, [token]);

  //   const { mutate, error, success } = useHandleSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handleSignUp = async () => {
    const { email, password, name, phoneNumber } = signupData;
    const signUpData2 = { ...signupData };
    const frontend_base_url = import.meta.env.VITE_frontend_base_url;

    const url = `${frontend_base_url}/insightflow/login/`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      phone: phoneNumber,
      options: {
        data: { display_name: name, phone: phoneNumber }, // Store display_name in metadata
        emailRedirectTo: `${frontend_base_url}/insightflow/login`, // Redirect URL after confirmation
      },
    });

    if (error) {
      // console.log(error);
      setErrorMessage(error.message);
      setSuccessMessage("");
    } else {
      const userId = data?.user?.id; // Get the user ID from auth response
      signUpData2.id = userId;

      if (userId != null) {
        try {
          const apiUrl = `${API_URL}/addUserIfNotExist`;
          console.log(apiUrl);

          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signUpData2),
          });

          // Try to parse JSON response
          let result;
          try {
            result = await response.json();
          } catch (jsonError) {
            throw new Error(
              `Invalid JSON response from server. Status: ${response.status}`
            );
          }

          if (!response.ok) {
            // Throw a detailed error message from the API response
            throw new Error(
              result.error || `HTTP error! Status: ${response.status}`
            );
          }
          setErrorMessage("");
          setSuccessMessage(
            "Sign-up successful! Please check your email to verify your account."
          );
          toast.success("Verification Email sent");
          setTimeout(() => {
            navigate("/verification", { state: { email } });
          }, 500);

          return result;
        } catch (error) {
          console.error("Error signing up user:", error);
          setErrorMessage("Email already exists");
          toast.error("Email aready exists.");

          return {
            success: false,
            message: error.message || "Something went wrong. Please try again.",
          };
        }
      }
    }
  };

  const [validation, setValidation] = useState({
    email: null,
    aadhaarNumber: null,
    phoneNumber: null,
    password: null,
  });

  const validateField = (name, value) => {
    let isValid = false;

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    } else if (name === "phoneNumber") {
      const phoneRegex = /^[6-9]\d{9}$/;
      isValid = phoneRegex.test(value);
    } else if (name === "aadhaarNumber") {
      const aadhaarRegex = /^\d{12}$/;
      isValid = aadhaarRegex.test(value);
    } else if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      isValid = passwordRegex.test(value);
    } else if (name === "name") {
      // isValid = true;
      return;
    }
    setValidation((prev) => ({ ...prev, [name]: isValid }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // console.log(name, " ", value);
    validateField(name, value);
  };

  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));

    // Clear previous timer
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timer for 2 seconds for validation
    const newTimeout = setTimeout(() => {
      validateField(name, value);
    }, 500);

    setTypingTimeout(newTimeout);
  };
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(Object.values(validation).every(Boolean));
    // console.log(validation);
  }, [validation]);
  //relative my-6 flex w-full flex-col gap-y-4 rounded-md border-2 bg-[#242424] p-8 font-inter text-sm font-medium text-[#fffff] shadow-2xl shadow-indigo-300 sm:w-8/12 md:w-6/12 lg:w-4/12
  //relative my-6 flex w-full flex-col gap-y-4 rounded-md border-2 bg-[#242424] p-8 font-inter text-sm font-medium text-[#fffff] shadow-2xl shadow-indigo-300 sm:w-8/12 md:w-6/12 lg:w-4/12
  return (
    <div className="dotted flex min-h-screen items-center justify-center bg-[#242424]  ">
      <div className="relative my-6 flex w-full flex-col gap-y-4 rounded-md border-2 bg-[#242424] p-8 font-inter text-sm font-medium text-[#fffff] shadow-2xl shadow-indigo-300 sm:w-8/12 md:w-6/12 lg:w-4/12">
        {/* <div className="absolute inset-0 -z-10 rounded-md bg-gradient-to-r from-violet-300 to-indigo-400"></div> */}
        <div className="mb-2 flex select-none text-center font-noto text-base font-semibold md:text-lg"></div>
        <div className="flex flex-col gap-y-1 ">
          <span className="">Your Name</span>
          <TextField.Root
            placeholder="Name"
            onChange={handleChange}
            name="name"
            value={signupData.name}
          ></TextField.Root>
        </div>

        <div className="flex flex-col gap-y-1">
          <span className="">Email</span>
          <TextField.Root
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={signupData.email}
            onBlur={handleBlur}
          ></TextField.Root>
        </div>
        {/* <div> */}
        {validation.email === false && (
          <p className="mt-2 text-red-500">Invalid email format</p>
        )}
        {/* {validation.email === true && (
            <p className="mt-2 text-green-500">Valid email format</p>
          )} */}
        {/* </div> */}

        <div className="flex flex-col gap-y-1">
          <span className="">Aadhaar No.</span>
          <TextField.Root
            placeholder="Aadhaar Number"
            onChange={handleChange}
            name="aadhaarNumber"
            value={signupData.aadhaarNumber}
            onBlur={handleBlur}
          ></TextField.Root>
        </div>
        {/* <div> */}
        {validation.aadhaarNumber === false && (
          <p className="mt-2 text-red-500">Invalid aadhaar format</p>
        )}
        {/* {validation.aadhaar === true && (
            <p className="mt-2 text-green-500">Valid aadhaar format</p>
          )} */}
        {/* </div> */}

        <div className="flex flex-col gap-y-1">
          <span className="">Phone No.</span>
          <TextField.Root
            placeholder="Phone Number"
            onChange={handleChange}
            onBlur={handleBlur}
            name="phoneNumber"
            value={signupData.phoneNumber}
          ></TextField.Root>
        </div>
        {/* <div> */}
        {validation.phoneNumber === false && (
          <p className="mt-2 text-red-500">Invalid Phone Number Format</p>
        )}
        {/* {validation.phone === true && (
            <p className="mt-2 text-green-500">Valid Phone Number Format</p>
          )} */}
        {/* </div> */}

        <div className="flex flex-col gap-y-1">
          <span className="">Password</span>
          <TextField.Root
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
            value={signupData.password}
            name="password"
          >
            <TextField.Slot className="relative">
              <Button
                variant="soft"
                color="gray"
                style={{
                  left: "0",
                  top: "0",
                  bottom: "0",
                  padding: "0 10px",
                  marginLeft: "-7px",
                  borderRadius: "4px 0 0 4px",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </Button>
            </TextField.Slot>
          </TextField.Root>
        </div>
        {validation.password === false && (
          <p className="text-red-500">
            Password must be at least 8 characters long, include an uppercase
            letter, a lowercase letter, a number, and a special character.
          </p>
        )}
        <Button
          color="iris"
          size="3"
          name="button"
          onClick={handleSignUp}
          disabled={!isFormValid}
        >
          SignUp
        </Button>
        <div>{errorMessage}</div>
        <div>{successMessage}</div>
        <p
          className="w-fit cursor-pointer select-none border-b border-white text-indigo-700 transition-all duration-200 hover:border-b hover:border-indigo-700"
          onClick={() => navigate("/login")}
        >
          Already have an account? Log In
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
