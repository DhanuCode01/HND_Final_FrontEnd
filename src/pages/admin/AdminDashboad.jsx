import { useEffect, useState } from "react";
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
  const [items, setItems] = useState([]);
  const [itemLoaded, setItemLoaded] = useState(false);
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!itemLoaded) {
      const token = localStorage.getItem("token");
      axios
        .get(`${backendurl}/api/product`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setItems(res.data);
          setItemLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [itemLoaded]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-primary to-accent p-6 font-['Roboto'] ml-1">
      <h1 className="text-4xl font-extrabold text-center text-black mb-10 drop-shadow-md">
        📊 Admin Dashboard
      </h1>

      {!itemLoaded ? (
        <div className="flex justify-center items-center h-[300px]">
          <div className="border-4 border-b-blue-500 rounded-full animate-spin w-[80px] h-[80px]"></div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-full max-w-6xl bg-white backdrop-blur-md border border-black p-6 rounded-2xl shadow-2xl hover:shadow-black transition duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-center text-black mb-6">
              📦 Product Quantities Overview
            </h2>
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={items}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#f50519" />
                  <XAxis
                    dataKey="name"
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                    height={70}
                    tick={{ fill: "#000000", fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: "#000000", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#05f519", borderRadius: "8px", borderColor: "#000000" }}
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
        </div>
      )}
    </div>
  );
}
