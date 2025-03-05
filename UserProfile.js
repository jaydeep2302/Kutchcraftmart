import { useState, useEffect } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", profilePicture: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // ✅ Fetch User Profile
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5001/api/user/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to load profile");

        const data = await response.json();
        setUser(data);
        setFormData({ name: data.name, email: data.email, profilePicture: data.profilePicture || "" });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Input Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Open Password Confirmation Popup
  const handleSave = () => {
    setShowPopup(true);
  };

  // ✅ Confirm Password & Save Changes
  const handleConfirmPassword = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5001/api/user/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong!");
        return;
      }

      setUser(data.user);
      setEditMode(false);
      setShowPopup(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!user) return <div className="text-center">🔄 Loading profile...</div>;
  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Profile</h2>
      
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!editMode}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editMode}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={!editMode}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          placeholder="address"
        />
      </div>

      {editMode ? (
        <button
          onClick={handleSave}
          className="w-full bg-teal-300 text-white py-3 rounded-lg text-lg font-medium transition hover:bg-teal-400"
        >
          Save Changes
        </button>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          className="w-full bg-teal-300 text-white py-3 rounded-lg text-lg font-medium transition hover:bg-teal-400"
        >
          Edit Profile
        </button>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Confirm Password</h3>
            <input
              type="password"
              placeholder="Enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 mb-3"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleConfirmPassword}
                className="bg-teal-300 text-white px-4 py-2 rounded-lg transition hover:bg-teal-400"
              >
                Confirm & Save
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg transition hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
