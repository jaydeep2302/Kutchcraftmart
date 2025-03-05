import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth";

const SellerProfile = () => {
  const [seller, setSeller] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [updatedSeller, setUpdatedSeller] = useState({});
  const [showBankAccount, setShowBankAccount] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showGst, setShowGst] = useState(false);
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellerProfile = async () => {
      const token = localStorage.getItem("sellerToken");
      if (!token) {
        navigate("/seller-login");
        return;
      }
      try {
        const response = await fetch(`${API_URL}/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setSeller(data);
          setUpdatedSeller(data);
        } else {
          setError(data.message || "Failed to fetch profile");
        }
      } catch (error) {
        setError("An error occurred while fetching seller details.");
      }
    };
    fetchSellerProfile();
  }, [navigate]);

  const handleEdit = () => setEditing(true);
  const handleChange = (e) => setUpdatedSeller({ ...updatedSeller, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSave = () => setShowPopup(true);
  
  const confirmUpdate = async () => {
    try {
      const token = localStorage.getItem("sellerToken");
      const response = await fetch(`${API_URL}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: updatedSeller.name,
          email: updatedSeller.email,
          phone: updatedSeller.phone,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSeller(updatedSeller);
        setEditing(false);
        setShowPopup(false);
        alert(data.message);
      } else 
      {
        alert(data.message);
      }
    } catch (error) {
      alert("An error occurred while updating seller details.");
    }
  };

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!seller) return <p className="text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex bg-teal-100">
      <div className="w-3/4 flex items-center justify-center">
        <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Seller Profile</h2>
          <div className="space-y-3">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <p><strong>Seller ID:</strong> {seller.sellerID}</p>
            {editing ? (
              <input type="text" name="name" value={updatedSeller.name} onChange={handleChange} className="border p-2 w-full" />
            ) : (
              <p><strong>Name:</strong> {seller.name}</p>
            )}
            {editing ? (
              <input type="email" name="email" value={updatedSeller.email} onChange={handleChange} className="border p-2 w-full" />
            ) : (
              <p><strong>Email:</strong> {seller.email}</p>
            )}
            {editing ? (
              <input type="text" name="phone" value={updatedSeller.phone} onChange={handleChange} className="border p-2 w-full" />
            ) : (
              <p><strong>Phone:</strong> {seller.phone}</p>
            )}
            <p><strong>Joined:</strong> {new Date(seller.createdAt).toLocaleDateString()}</p>
            <p><strong>Joined:</strong> {new Date(seller.createdAt).toLocaleDateString()}</p>
            <p>
              <strong>Bank Account:</strong> {showBankAccount ? seller.bankAccount : "**** **** **** ****"} 
              <button onClick={() => setShowBankAccount(!showBankAccount)} className="ml-2 text-teal-500 hover:text-teal-600">{showBankAccount ? "Hide" : "Show"}</button>
            </p>
            <p>
              <strong>Address:</strong> {showAddress ? seller.address : "********"} 
              <button onClick={() => setShowAddress(!showAddress)} className="ml-2 text-teal-500 hover:text-teal-600">{showAddress ? "Hide" : "Show"}</button>
            </p>
            <p>
              <strong>GST No:</strong> {showGst ? seller.gstNumber : "********"} 
              <button onClick={() => setShowGst(!showGst)} className="ml-2 text-teal-500 hover:text-teal-600">{showGst ? "Hide" : "Show"}</button>
            </p>
          </div>
          {editing ? (
            <button onClick={handleSave} className="mt-6 w-full bg-teal-300 hover:bg-teal-400 text-white font-bold py-2 rounded-lg transition duration-300">Save</button>
          ) : (
            <button onClick={handleEdit} className="mt-6 w-full bg-teal-300 hover:bg-teal-400 text-white font-bold py-2 rounded-lg transition duration-300">Edit</button>
          )}
          <button onClick={() => { localStorage.removeItem("sellerToken"); navigate("/seller-login"); }} className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition duration-300">Logout</button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold mb-3">Enter Password to Confirm</h2>
            <input type="password" value={password} onChange={handlePasswordChange} className="border p-2 w-full mb-3" />
            <div className="flex justify-between">
              <button onClick={confirmUpdate} className="bg-green-500 text-white px-4 py-2 rounded">Confirm</button>
              <button onClick={() => setShowPopup(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProfile;
