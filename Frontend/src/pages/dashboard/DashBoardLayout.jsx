import React, { useEffect, useState } from "react";
import HeaderBar from "../../components/HeaderBar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import SideNavbar from "../../components/SideNavbar";
import loginLogo from "../../assets/authenticate.svg";
import { SERVER_URL } from "../../router";

function DashBoardLayout() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data, status } = await axios.get(`${SERVER_URL}/api/v1/users/me`, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });

        if (status === 200) {
          setUserData(data);
        } else {
          navigate("/auth");
        }
      } catch (error) {
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 border-b-2 border-l-2 border-r-2 border-black border-t-white animate-spin rounded-full"></div>
        <h1 className="font-semibold animate-pulse text-gray-700">Loading...</h1>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <img src={loginLogo} alt="Please login" className="max-w-md mb-6" />
        <Link
          to="/auth"
          className="px-6 py-2 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition"
        >
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <>
      <HeaderBar user={userData.user} />
      <div className="grid grid-rows-[56px_1fr] grid-cols-12 h-screen overflow-hidden">
        {/* Header spacer */}
        <div className="bg-red-400 col-span-12"></div>

        {/* Sidebar */}
        <aside className="col-span-3 lg:col-span-2 overflow-y-auto bg-white border-r border-gray-200">
          <SideNavbar />
        </aside>

        {/* Main content */}
        <main className="col-span-9 lg:col-span-10 overflow-y-auto bg-gray-50 p-4">
          <Outlet context={[userData, userData.user]} />
        </main>
      </div>
    </>
  );
}

export default DashBoardLayout;
