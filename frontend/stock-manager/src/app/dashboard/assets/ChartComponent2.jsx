"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";

export const ChartComponent2 = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:8080/api/products", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const products = await response.json();

        const categoryQuantities = products.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + product.quantity;
          return acc;
        }, {});

        const formattedData = Object.entries(categoryQuantities).map(([name, quantity]) => ({
          name,
          quantity
        }));

        console.log("Formatted Data for ChartComponent2:", formattedData);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  const formatYAxis = (tick) => tick.toLocaleString();

  return (
    <div className="w-full h-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
           <YAxis tickFormatter={formatYAxis} />
          <Tooltip formatter={(value) => value.toLocaleString()} />
        <Legend />
        <Area type="monotone" dataKey="quantity" stroke="#f51957" fill="#f51957" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
  );
};
