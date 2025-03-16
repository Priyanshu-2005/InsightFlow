// // import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
// // import { Button, TextField } from "@radix-ui/themes";
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { supabase } from "../utils/supabaseClient";
// // import { AuthApiError } from "@supabase/supabase-js";
// // import { toast } from "sonner";
// // import { useLocation } from "react-router-dom";

// // function LoginPage() {
// //   const location = useLocation();

// //   const [loginData, setLoginData] = useState({
// //     email: "",
// //     password: "",
// //   });
// //   //   const queryClient = useQueryClient();
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   //   const { mutate, onSuccess, onError } = useCheckLogin();
// //   const [token, setToken] = useState(
// //     localStorage.getItem("sb-vakmfwtcbdeaigysjgch-auth-token")
// //   );

// //   useEffect(() => {
// //     if (token) {
// //       toast.success("Login successful! Redirecting to dashboard....");
// //       setSuccessMessage("Logging in....");
// //       setTimeout(() => {
// //         window.location.href = "/app";
// //       }, 500);
// //     }
// //   }, [token]);

// //   const [successMessage, setSuccessMessage] = useState("");
// //   const navigate = useNavigate();

// //   const handleSignIn = async () => {
// //     const { email, password } = loginData;
// //     const { error, data } = await supabase.auth.signInWithPassword({
// //       email,
// //       password,
// //     });

// //     if (error) {
// //       setErrorMessage("Wrong credentials. Please Try Again.");
// //       window.alert("Wrong credentials. Please Try Again.");
// //       toast.error("Wrong Credentials. Try again.");
// //       throw new Error(error.message || "Login failed");
// //     } else {
// //       toast.success("Login successful! Redirecting to dashboard....");
// //       setSuccessMessage("Logging in....");
// //       setTimeout(() => {
// //         window.location.href = "/app";
// //       }, 500);
// //     }
// //   };
// //   useEffect(() => {
// //     if (location.state?.sessionExpired) {
// //       toast.error("Session Expired. Please Login Again.");
// //       navigate("./login", { replace: true }); // Reset state
// //     } else if (location.state?.loggedOut) {
// //       toast.success("Signed Out Successfully");
// //       navigate("./login", { replace: true }); // Reset state
// //     }
// //   }, [location]);

// //   return (
// //     <div className="dotted flex h-screen items-center justify-center">
// //       <div className="relative my-6 flex w-11/12 flex-col gap-y-4 rounded-md border-2 bg-white p-8 font-inter text-sm font-medium text-[#5d5d5d] shadow-2xl shadow-indigo-300 sm:w-8/12 md:w-6/12 lg:w-4/12">
// //         <div className="absolute left-3 top-3 -z-10 h-full w-full animate-fade-up rounded-md bg-gradient-to-r from-violet-300 to-indigo-400"></div>
// //         <div className="mb-2 flex select-none justify-center text-center font-noto text-base font-semibold md:text-lg">
// //           Welcome back to InsightFlow.
// //         </div>

// //         <div className="flex flex-col gap-y-1">
// //           <span className="">Email</span>
// //           <TextField.Root
// //             placeholder="Email"
// //             onChange={(e) =>
// //               setLoginData({ ...loginData, email: e.target.value })
// //             }
// //             value={loginData.email}
// //           ></TextField.Root>
// //         </div>

// //         <div className="flex flex-col gap-y-1">
// //           <span className="">Password</span>
// //           <TextField.Root
// //             type={showPassword ? "text" : "password"}
// //             placeholder="Password"
// //             onChange={(e) =>
// //               setLoginData({ ...loginData, password: e.target.value })
// //             }
// //             value={loginData.password}
// //           >
// //             <TextField.Slot className="relative">
// //               <Button
// //                 variant="soft"
// //                 color="gray"
// //                 style={{
// //                   left: "0",
// //                   top: "0",
// //                   bottom: "0",
// //                   padding: "0 10px",
// //                   marginLeft: "-7px",
// //                   borderRadius: "4px 0 0 4px",
// //                 }}
// //                 onClick={() => setShowPassword(!showPassword)}
// //               >
// //                 {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
// //               </Button>
// //             </TextField.Slot>
// //           </TextField.Root>
// //         </div>
// //         <Button color="iris" size="3" onClick={handleSignIn}>
// //           Login
// //         </Button>

// //         <div>{errorMessage}</div>
// //         <div>{successMessage}</div>
// //         <p
// //           className="w-fit cursor-pointer select-none border-b border-white text-indigo-700 transition-all duration-200 hover:border-b hover:border-indigo-700"
// //           onClick={() => navigate("/signup")}
// //         >
// //           Don't have an account? Sign Up
// //         </p>
// //         <p
// //           className="w-fit cursor-pointer select-none border-b border-white text-indigo-700 transition-all duration-200 hover:border-b hover:border-indigo-700"
// //           onClick={() => navigate("/user/resetPassEnterEmail")}
// //         >
// //           Forgot Password?
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default LoginPage;
// import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
// import { Button, TextField } from "@radix-ui/themes";
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { supabase } from "../utils/supabaseClient";
// import { toast } from "sonner";

// function LoginPage() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Check for existing session on component mount
//   useEffect(() => {
//     const checkExistingSession = async () => {
//       const { data } = await supabase.auth.getSession();
//       if (data.session) {
//         toast.success("Already logged in! Redirecting to dashboard...");
//         navigate("/app", { replace: true });
//       }
//     };

//     checkExistingSession();
//   }, [navigate]);

//   // Handle location state (session expired or logged out)
//   useEffect(() => {
//     if (location.state?.sessionExpired) {
//       toast.error("Session expired. Please login again.");
//       navigate(".", { replace: true }); // Clear state
//     } else if (location.state?.loggedOut) {
//       toast.success("Signed out successfully");
//       navigate(".", { replace: true }); // Clear state
//     }
//   }, [location, navigate]);

//   const handleSignIn = async () => {
//     try {
//       setIsLoading(true);
//       setErrorMessage("");

//       const { email, password } = loginData;
//       const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) {
//         setErrorMessage("Wrong credentials. Please try again.");
//         toast.error("Wrong credentials. Please try again.");
//       } else {
//         toast.success("Login successful! Redirecting to dashboard...");
//         navigate("/app", { replace: true });
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred");
//       setErrorMessage("Login failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="dotted flex h-screen items-center justify-center">
//       <div className="relative my-6 flex w-11/12 flex-col gap-y-4 rounded-md border-2 bg-white p-8 font-inter text-sm font-medium text-[#5d5d5d] shadow-2xl shadow-indigo-300 sm:w-8/12 md:w-6/12 lg:w-4/12">
//         <div className="absolute left-3 top-3 -z-10 h-full w-full animate-fade-up rounded-md bg-gradient-to-r from-violet-300 to-indigo-400"></div>
//         <div className="mb-2 flex select-none justify-center text-center font-noto text-base font-semibold md:text-lg">
//           Welcome back to InsightFlow.
//         </div>

//         <div className="flex flex-col gap-y-1">
//           <span>Email</span>
//           <TextField.Root
//             placeholder="Email"
//             onChange={(e) =>
//               setLoginData({ ...loginData, email: e.target.value })
//             }
//             value={loginData.email}
//           />
//         </div>

//         <div className="flex flex-col gap-y-1">
//           <span>Password</span>
//           <div className="relative">
//             <TextField.Root
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               onChange={(e) =>
//                 setLoginData({ ...loginData, password: e.target.value })
//               }
//               value={loginData.password}
//             />
//             <Button
//               variant="ghost"
//               size="1"
//               className="absolute right-2 top-1/2 -translate-y-1/2"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
//             </Button>
//           </div>
//         </div>

//         <Button
//           color="iris"
//           size="3"
//           onClick={handleSignIn}
//           disabled={isLoading}
//         >
//           {isLoading ? "Logging in..." : "Login"}
//         </Button>

//         {errorMessage && (
//           <div className="text-center text-red-600">{errorMessage}</div>
//         )}

//         <p
//           className="w-fit cursor-pointer select-none border-b border-white text-indigo-700 transition-all duration-200 hover:border-b hover:border-indigo-700"
//           onClick={() => navigate("/signup")}
//         >
//           Don't have an account? Sign Up
//         </p>
//         <p
//           className="w-fit cursor-pointer select-none border-b border-white text-indigo-700 transition-all duration-200 hover:border-b hover:border-indigo-700"
//           onClick={() => navigate("/user/resetPassEnterEmail")}
//         >
//           Forgot Password?
//         </p>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Button, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { toast } from "sonner";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Check for existing session on component mount
  useEffect(() => {
    const checkExistingSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        toast.success("Already logged in! Redirecting to dashboard...");
        navigate("/app", { replace: true });
      }
    };
    checkExistingSession();
  }, [navigate]);

  // Handle location state (session expired or logged out)
  useEffect(() => {
    if (location.state?.sessionExpired) {
      toast.error("Session expired. Please login again.");
      navigate(".", { replace: true }); // Clear state
    } else if (location.state?.loggedOut) {
      toast.success("Signed out successfully");
      navigate(".", { replace: true }); // Clear state
    }
  }, [location, navigate]);

  const handleSignIn = async (e) => {
    // Prevent form from refreshing the page
    e.preventDefault();
    try {
      setIsLoading(true);
      setErrorMessage("");

      const { email, password } = loginData;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage("Wrong credentials. Please try again.");
        toast.error("Wrong credentials. Please try again.");
      } else {
        toast.success("Login successful! Redirecting to dashboard...");
        navigate("/app", { replace: true });
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      setErrorMessage("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    //bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100
    <div className="flex h-screen pt-12 pl-12 pr-12 items-center justify-center bg-[#242424]">
      <div className="w-full max-w-md rounded-lg bg-[#242424] p-8 shadow-xl">
        {/* Heading / Logo */}
        <h1 className="mb-6 text-center text-2xl font-bold text-indigo-600">
          Welcome back to InsightFlow
        </h1>

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-5">
          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium">
              Email
            </label>
            <TextField.Root
              id="email"
              placeholder="you@example.com"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <TextField.Root
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <div className="">
                <Button
                  variant="ghost"
                  size="1"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </Button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="rounded bg-red-50 p-2 text-center text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              color="iris"
              size="3"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        {/* Additional Links */}
        <div className="mt-6 flex flex-col items-center space-y-2 text-sm">
          <p
            className="cursor-pointer text-indigo-600 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Don’t have an account? Sign Up
          </p>
          <p
            className="cursor-pointer text-indigo-600 hover:underline"
            onClick={() => navigate("/user/resetPassEnterEmail")}
          >
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
