import { useEffect, useState } from "react";
import "./AdminitemPage.css";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const [productItems, setProductItems] = useState([]);
  const [rentItems, setRentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendurl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProductItems = axios.get(`${backendurl}/api/product`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const fetchRentItems = axios.get(`${backendurl}/api/rent`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    Promise.all([fetchProductItems, fetchRentItems])
      .then(([productRes, rentRes]) => {
        setProductItems(productRes.data);
        setRentItems(rentRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full min-h-screen bg-picture p-6 font-['Roboto'] ml-1">
      <h1 className="text-4xl font-extrabold text-center text-black mb-10 drop-shadow-md">
        📊 Admin Dashboard
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <div className="border-4 border-b-blue-500 rounded-full animate-spin w-[80px] h-[80px]"></div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-center gap-6">
          {/* Product Chart */}
          <div className="w-full lg:w-1/2 bg-white border border-black p-6 rounded-2xl shadow-2xl hover:shadow-black transition duration-300">
            <h2 className="text-2xl font-semibold text-center text-black mb-6">
              📦 Product Quantities Overview
            </h2>
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productItems}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#f50519" />
                  <XAxis
                    dataKey="key"
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                    height={70}
                    tick={{ fill: "#000000", fontSize: 12 }}
                  />
                  <YAxis domain={[0, 100]} tick={{ fill: "#000000", fontSize: 12 }} />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#05f519",
                      borderRadius: "8px",
                      borderColor: "#000000",
                    }}
                    labelStyle={{ color: "#03194d", fontWeight: "bold" }}
                  />
                  <Bar
                    dataKey="quantity"
                    fill="#0e48e9"
                    radius={[10, 10, 0, 0]}
                    barSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rent Item Chart */}
          <div className="w-full lg:w-1/2 bg-white border border-black p-6 rounded-2xl shadow-2xl hover:shadow-black transition duration-300">
            <h2 className="text-2xl font-semibold text-center text-black mb-6">
              👗 Rent Item Quantities Overview
            </h2>
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rentItems}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#f50519" />
                  <XAxis
                    dataKey="key"
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                    height={70}
                    tick={{ fill: "#000000", fontSize: 12 }}
                  />
                  <YAxis domain={[0, 100]} tick={{ fill: "#000000", fontSize: 12 }} />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f5a623",
                      borderRadius: "8px",
                      borderColor: "#000000",
                    }}
                    labelStyle={{ color: "#03194d", fontWeight: "bold" }}
                  />
                  <Bar
                    dataKey="quantity"
                    fill="#f50519"
                    radius={[10, 10, 0, 0]}
                    barSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
