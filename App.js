
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import SellerLanding from "./pages/sellerlanding";
import Sellerlogin from "./components/SellerLogin";
import SellerProfile from "./pages/SellerProfile";
import MultiStepForm from "./components/SellerRegister";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./components/AddProduct";
import ManageProducts from "./components/ManageProducts";
import OrdersPage from "./components/OrdersPage";
import "./index.css"; 

function App() {


  return (
    <Router>
          <Routes>
            <Route path="/" element={<SellerLanding/>} />
            <Route path="/seller-dashboard" element={<Dashboard/>}/>
            <Route path="/seller-registration" element={<MultiStepForm />} />
            <Route path="/seller-login" element={<Sellerlogin />} />
            <Route path="/seller-profile" element={<SellerProfile />} />
            <Route path="/addproduct" element={<AddProduct />}/>
            <Route path="/products" element={<ManageProducts />}/>
            <Route path="/orders" element={<OrdersPage />}/>
          </Routes>
    </Router>
  );
}

export default App;
