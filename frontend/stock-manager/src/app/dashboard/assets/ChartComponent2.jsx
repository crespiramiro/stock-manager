"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const ChartComponent2 = ({token}) => {
  const [chartData, setChartData] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`
        };

        const response = await fetch('http://localhost:8080/api/products', {
          method: 'GET',
          headers: headers
        });

        if (response.status === 401) {
          await refreshToken();
          return; 
        }

        if (!response.ok) {
          throw new Error('Request Error');
        }

        const products = await response.json();

        const categoryQuantities = products.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + product.quantity;
          return acc;
        }, {});

        const formattedData = Object.entries(categoryQuantities).map(([name, quantity]) => ({
          name,
          quantity
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching product data:", error);
        if (error.message.includes('401')) {
         router.push('/')
        }
      }
    };

    fetchData();
  }, [token]);
  const formatYAxis = (tick) => tick.toLocaleString();

  return (
    <div className="w-full h-full  ">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
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

export default ChartComponent2;