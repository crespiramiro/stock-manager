"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const AreaChartComponent = ({token}) => {
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

  const formatYAxis = (tick) => `$${tick.toLocaleString()}`;

  return (
    <div className="w-full h-full ">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 45, left: 45, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 14, fill: '#333' }} />
          <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 14, fill: '#333' }} />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
          <Area type="monotone" dataKey="averagePrice" stroke="#2fad7e" fill="#2fad7e" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;