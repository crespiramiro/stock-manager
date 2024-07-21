"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";

const AreaChartComponent = ({token}) => {
  const [chartData, setChartData] = useState([]);

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

        if (response.status === 401) { // Si el token está expirado o inválido
          await refreshToken();
          return; // Reintentar la solicitud después de actualizar el token
        }

        if (!response.ok) {
          throw new Error('Error en la solicitud');
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

        console.log("Formatted Data for AreaChartComponent:", formattedData);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching product data:", error);
        // Redirigir al usuario si el error es relacionado con la autenticación
        if (error.message.includes('401')) {
          window.location.href = '/'; // Redirige al inicio de sesión o página de error
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