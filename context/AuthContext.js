import axios from "axios";
import { handleError } from "lib/helper";
import { Router, useRouter } from "next/router";
import { toast } from "react-toastify";

const { createContext, useState, useEffect } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [cellphone, setCellphone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkedUserLoggedIn();
  }, [])

  const login = async (cellphone) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/login`,
        { cellphone }
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  const checkOTP = async (otp) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/checkOtp`,
        { otp }
      );
      setUser(res.data.user)
      toast.success("ورود موفقیت آمیز بود!");
      router.push("/");
    } catch (err) {
      toast.error(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  const checkedUserLoggedIn = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/me`,
      );
      setUser(res.data.user)
    } catch (err) {
      setUser(null);
  }};

  const resendOtp = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/resendOtp`);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(handleError(err));
    }
  }

  const userLogout = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/logout`,
      );
      setUser(null);
      toast.success(res.data.message);
      router.push("/");
    } catch (err) {
      toast.error(handleError(err));
  }
  }

  return (
    <AuthContext.Provider
      value={{ login, cellphone, setCellphone, loading, otp, setOtp, checkOTP, user, resendOtp, userLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
