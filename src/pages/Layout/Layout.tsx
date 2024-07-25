import { Outlet } from "react-router-dom";
import Nav from "./Navbar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Nav />
      <div className="px-5">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
