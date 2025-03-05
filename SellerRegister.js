import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { registerSeller } from "../api/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const MultiStepForm = () => {

  const [isRegistering, setIsRegistering] = useState(false); // Track register process
  const [isRegistered, setIsRegistered] = useState(false); // Track if registered



  const [step, setStep] = useState(1);
  const [sellerID, setSellerID] = useState("SELLER" + Math.floor(1000 + Math.random() * 9000));
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    gstNumber: "",
    address: "",
    bankAccount: "",
    ifscCode: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
      
    }
    setIsRegistering(true);
    try {
      const res = await registerSeller({ ...formData, sellerID });
      console.log("Seller Registered Successfully:", registerSeller);
      localStorage.setItem("token", res.data.token);
      alert("Registration Successful! Redirecting to login...");
      setIsRegistered(true); // Redirect to Seller Login Page
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Auth Details</h2>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded mb-4" />
            <button onClick={nextStep} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Next</button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Shop Details</h2>
            <input type="text" name="businessName" placeholder="Business Name" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="gstNumber" placeholder="GST123456" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <textarea name="address" placeholder="Business Address" onChange={handleChange} className="w-full p-2 border rounded mb-4"></textarea>
            <button onClick={prevStep} className="mr-2 bg-gray-400 text-white py-2 px-4 rounded">Back</button>
            <button onClick={nextStep} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Next</button>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Bank Details</h2>
            <input type="text" name="bankAccount" placeholder="Bank Account Number" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="ifscCode" placeholder="IFSC Code" onChange={handleChange} className="w-full p-2 border rounded mb-4" />
            <button onClick={prevStep} className="mr-2 bg-gray-400 text-white py-2 px-4 rounded">Back</button>
            <button onClick={nextStep} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Next</button>
          </div>
        )}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Seller ID & Password</h2>
            <input type="text" name="sellerID" value={sellerID} onChange={(e) => setSellerID(e.target.value)} className="w-full p-2 border rounded mb-2" />
            <div className="relative">
              <input type={passwordVisible ? "text" : "password"} name="password" placeholder="Set Password" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
              <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full p-2 border rounded mb-4" />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
            onClick={handleSubmit}
            className={`w-full py-2 rounded ${isRegistering ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"}`}
            disabled={isRegistering}
          >
            {isRegistering ? "Registering..." : "Register"}
          </button>

          {/* Login Button Appears After Registration */}
          {isRegistered && (
            <button onClick={() => navigate("/")} className="w-full bg-blue-500 text-white py-2 mt-3 rounded hover:bg-blue-600">
              Go to home
            </button>
          )}
        </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
