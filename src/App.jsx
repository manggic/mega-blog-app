import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";

import { login, logout } from "./store/authSlice";

import { Loading, Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Client, Account } from "appwrite";

const {
  VITE_APPWRITE_URL,
  VITE_APPWRITE_PROJECT_ID,
  VITE_APPWRITE_DATABASE_ID,
  VITE_APPWRITE_COLLECTION_ID,
  VITE_APPWRITE_BUCKET_ID,
} = import.meta.env;
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const { handleSubmit, register, watch } = useForm();

  const handleMySubmit = (d) => {
    console.log(d);
  };

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default App;
