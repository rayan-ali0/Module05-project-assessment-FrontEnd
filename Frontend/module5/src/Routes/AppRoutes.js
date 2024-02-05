import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { useContext } from "react";
// import Products from "../Pages/Products/Products.jsx";
// import Signup from "../Pages/Signup/Signup.jsx";
import Home from "../Pages/Home/Home.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { UserContext } from "../useContext/UserContext.js";
import Unauthorized from "../Pages/Unauth/Unauth.js";
import SignForm from "../Pages/Login/SignForm.js";
const AppRoutes = () => {
  const { user, checkUser } = useContext(UserContext);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<Home />} />
          <Route exact path="/sign/:type" element={<SignForm />} />
          <Route  path="/productDetails/:slug" element={<productDetails />} />
          <Route  path="/cart" element={<productDetails />} />


          <Route
            element={
              <ProtectedRoute
                isAllowed={user && user.role === "admin"}
                redirectPath="/unauthorized"
              />
            }>
       
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;