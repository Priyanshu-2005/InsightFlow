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
    <div className="flex h-screen -mt-20 pt-12 pl-12  pr-12 items-center justify-center bg-[#121212] ">
      <div className="w-full max-w-md rounded-lg -mt-52 bg-[#121212]  p-8 shadow-xl">
        {/* Heading / Logo */}
        <div className="mb-6 text-center text-2xl font-bold text-indigo-600">
          Welcome back to InsightFlow
        </div>

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
          {/* <p
            className="cursor-pointer text-indigo-600 hover:underline"
            onClick={() => navigate("/user/resetPassEnterEmail")}
          >
            Forgot Password?
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
