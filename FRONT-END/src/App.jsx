import Home from "./components/Home";
import Menu from "./components/Menu";
import WishList from "./components/WishList";
import Profile from "./components/Profile";
import About from "./components/About";
import Orders from "./components/Orders";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import OurMostPopularDeals from "./components/OurMostPopularDeals";
import UserList from "./components/UserList";
import OrdersList from "./components/OrdersList";
import AdminTrash from "./components/AdminTrash";
import Carts from "./components/Carts";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Nav from "./components/Nav";
import { Toaster } from "react-hot-toast";
import OrderDetails from "./components/OrderDetails";
function App() {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-green-900">
      {/* <Nav /> */}
      <Toaster/>
      <Routes>

            <Route path="/" element={<Nav />}>
            <Route index element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Menu" element={<Menu />} />
            <Route element={<ProtectedRoute />}>
            <Route path="/Profile" element={<Profile />} />
            <Route path="/WishList" element={<WishList />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Carts" element={<Carts />} />
            <Route path="/orderDetails/:orderId" element={<OrderDetails />} />

          </Route>

            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup/>}/>
          </Route>
            <Route path="/AdminPanel" element={<AdminPanel />} />
            <Route path="/OurMostPopularDeals" element={<OurMostPopularDeals />} />
            <Route path="/UserList" element={<UserList />} />
            <Route path="/OrdersList" element={<OrdersList />} />

            <Route path="/AdminTrash" element={<AdminTrash />} />

          <Route path="*" element={<PageNotFound/>} />
    </Routes>
    </div>
  );
}

export default App;
