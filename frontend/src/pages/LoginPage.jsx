import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access")) {
      navigate("/");
    }
  }, []);

  return <AuthForm type="login" />;
}
