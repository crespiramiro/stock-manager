'use client'
import { useState, useEffect } from "react";
import Topbar from "./Topbar";
import { AreaChartComponent } from "./assets/AreaChartComponent";
import { ChartComponent2 } from "./assets/ChartComponent2";

export default function Maincontent () {
  const [token, setToken] = useState(localStorage.getItem('token'));


 
  const refreshToken = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      if (!response.ok) {
        throw new Error('Error al renovar el token');
      }

      const { token: newToken } = await response.json();
      localStorage.setItem('token', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Error al renovar el token:', error);
      window.location.href = '/'; // Redirige al inicio de sesión o página de error
    }
  };

  useEffect(() => {
    const handleTokenRefresh = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 401) { // Si el token está expirado o inválido
          await refreshToken();
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        if (error.message.includes('401')) {
          window.location.href = '/'; // Redirige al inicio de sesión o página de error
        }
      }
    };

    handleTokenRefresh();
  }, [token]);


    return (
<main className="w-full h-screen overflow-auto bg-white shadow-md">
      <section className="topbar-container">
        <Topbar />
      </section>
      <section className="content p-12 flex flex-col gap-y-8">
        <div className="total-products">
          <h2 className="text-3xl font-medium">Total Products</h2>
        </div>
        <article className="charts flex flex-row w-full gap-x-8">
          <div className="chart1 w-1/2 h-96 p-4 bg-gray-50 shadow-sm rounded-md">
            <AreaChartComponent token={token} />
          </div>
          <div className="chart2 w-1/2 h-96 p-4 bg-gray-50 shadow-sm rounded-md">
            <ChartComponent2 token={token} />
          </div>
        </article>
      </section>
    </main>
    )
}