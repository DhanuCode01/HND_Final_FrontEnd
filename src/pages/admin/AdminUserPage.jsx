import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminitemPage.css"
import axios from "axios";

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!Loaded) {
      const token = localStorage.getItem("token");
      axios
        .get(backendurl + "/api/user/all", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
          setLoaded(false);
        });
    }
  }, [Loaded]);

  return (
    <div className="p-4 bg-picture">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.profilePicture || "https://via.placeholder.com/50"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Type:</strong> {user.type}</p>
                <p><strong>Address:</strong> {user.address}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
