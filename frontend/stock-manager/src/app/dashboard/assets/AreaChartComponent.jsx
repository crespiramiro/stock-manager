"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";

export const AreaChartComponent = () => {
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

        const categoryPrices = products.reduce((acc, product) => {
          acc[product.category] = acc[product.category] || { total: 0, count: 0 };
          acc[product.category].total += product.price;
          acc[product.category].count += 1;
          return acc;
        }, {});

        const formattedData = Object.entries(categoryPrices).map(([name, data]) => ({
          name,
          averagePrice: data.total / data.count
        }));

        console.log("Formatted Data for AreaChartComponent:", formattedData);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, []);

  const formatYAxis = (tick) => `$${tick.toLocaleString()}`;

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 45, left: 45, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
          <Area type="monotone" dataKey="averagePrice" stroke="#2fad7e" fill="#2fad7e" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};