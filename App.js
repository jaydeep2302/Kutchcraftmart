import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SellerPage  from './views/seller/SellerPage';
import Homepage from "./views/user/Homepage";
import Men from './views/user/men';
import Women from './views/user/women';
import Footwear from './views/user/footwear';
import Homedecor from './views/user/homedecor';
import Children from './views/user/children';
import LoginPage from './component/loginpage';
import SignUp from "./component/SignUp";
import UserProfile from '../src/views/user/UserProfile';
import CartPage from './component/Cart';
import ProductDetail from './component/Productdetail';
import OrderPage from './component/OrderPage';
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/seller" element={<SellerPage />} /> */}
        <Route path="/men" element={<Men />} />
        <Route path="/Women" element={<Women />} />
        <Route path="/children" element={<Children />} />
        <Route path="/Footwear" element={<Footwear />} />
        <Route path="/homedecor" element={<Homedecor />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/product' element={<ProductDetail />} />
        <Route path='/order' element={<OrderPage />} />
        {/* <Route path='/sellerpage' element={<SellerPage />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
