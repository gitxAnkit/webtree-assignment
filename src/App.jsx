import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Person, Phone, Email, CalendarToday } from "@mui/icons-material";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api/?page=1&results=1&seed=abc")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.results[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-800 p-8 flex items-center justify-center">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <CircularProgress className="text-white" />
          <p className="text-white text-lg font-medium">Loading profile...</p>
        </div>
      ) : user ? (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full transition-all duration-300 hover:shadow-3xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-gradient-to-br from-blue-700 to-purple-700 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-black/20 rounded-full" />
                <img
                  className="w-60 h-60 rounded-full object-cover border-4 border-white shadow-xl"
                  src={user.picture.large}
                  alt={`${user.name.first} ${user.name.last}`}
                />
              </div>
            </div>

            <div className="md:w-1/2 p-8">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user.name.first} {user.name.last}
                  </h1>
                  <p className="text-blue-600 font-medium mt-1">
                    {user.location.city}, {user.location.country}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Person className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p
                        className="font-medium text-gray-900"
                        style={{ textTransform: "capitalize" }}
                      >
                        {user.gender}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Phone className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{user.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Email className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <CalendarToday className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium text-gray-900">
                        {new Date(user.dob.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white text-lg font-medium bg-red-500/10 px-4 py-2 rounded-lg">
          Error fetching user data
        </div>
      )}
    </div>
  );
};

export default App;
