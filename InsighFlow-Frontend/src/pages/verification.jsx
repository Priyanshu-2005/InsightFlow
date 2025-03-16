import { Button, Code } from "@radix-ui/themes";
// import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

// import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
// import { toast } from "react-toastify";
import { toast } from "sonner";
// import "react-toastify/dist/ReactToastify.css";

function AccountVerification() {
  const [dataUser, setdataUser] = useState(null);
  const [fg, setfg] = useState(null);
  useEffect(() => {
    console.log(fg);
    async function func() {
      const { error, data } = await supabase.auth.getUser();
      setdataUser(data);
      console.log(data, " ", dataUser);
    }
    func();
  }, [fg]);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email || "undefined email";

  const [timer, setTimer] = useState(90); // Initial timer value in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timer, isTimerActive]);
  const [message, setMessage] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handleResend = async () => {
    // console.log("sending resend email:");
    try {
      const response = await fetch(`${API_BASE_URL}/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setTimer(90);
      setIsTimerActive(true);
      const data = await response.json();
      setMessage(data.message || "Failed to resend email");
    } catch (error) {
      setMessage("Error sending email");
    }
  };
  const tokenString = localStorage.getItem(
    "sb-xbwcvsgisrkvaaxasrpl-auth-token"
  );
  const [token, setToken] = useState(() => {
    const tokenString = localStorage.getItem(
      "sb-xbwcvsgisrkvaaxasrpl-auth-token"
    );
    return JSON.parse(tokenString);
  });

  const updateToken = () => {
    const tokenString = localStorage.getItem(
      "sb-xbwcvsgisrkvaaxasrpl-auth-token"
    );
    setToken(JSON.parse(tokenString));
  };

  const [userEmailStatus, setUserEmailStatus] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setToken(session);
          setfg(true);
          // Optionally, re-fetch user data if needed
          // refetchUser();
        }
      }
    );
  }, [dataUser]);

  useEffect(() => {
    console.log("in useeffect:", dataUser);
    console.log(token?.user?.email);

    console.log(email);
    // console.log(dataUser);
    if (dataUser?.user) {
      if (token?.user?.email === email) {
        toast.success("Email verified proceed to LogIn");
        setTimeout(() => {
          // navigate("/verification", { state: { email } });
          navigate("/verified");
        }, 500);
      }
    }
  }, [dataUser, token, email, navigate]);

  return (
    <div className="flex -mt-12 h-[100svh] w-full items-center justify-center bg-[#121212]  font-noto font-medium">
      <div className="m-4 flex -mt-40 flex-col items-center justify-center gap-y-4 rounded-lg bg-[#121212]  p-8 drop-shadow-lg">
        <div className="mb-4 rounded-sm border border-green-400 bg-green-200 px-3 py-1 text-center text-lg font-semibold text-green-900">
          Please verify your email
        </div>
        <div>You're almost there! We sent an email to</div>
        <Code>{email}</Code>
        <div className="mt-4 text-sm">
          Just click on the link in that email to complete your signup.
          <br />
          If you don't see it, you may need to check your spam folder.
        </div>

        <div className="flex flex-col items-center text-sm">
          <div>Still can't find the email?</div>
          <div className="my-1 bg-indigo-600 hover:bg-indigo-700 ">
            <Button
              color="iris"
              disabled={isTimerActive}
              onClick={handleResend}
            >
              {isTimerActive ? `Resend email in ${timer}s` : `Resend email`}
            </Button>
          </div>
        </div>

        <div className="flex gap-x-1 text-sm">
          <div>Need help?</div>
          {/* <div
            className="cursor-pointer text-indigo-800 underline"
            onClick={() => console.log("Contact Us")}
          >
            Contact Us
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AccountVerification;
