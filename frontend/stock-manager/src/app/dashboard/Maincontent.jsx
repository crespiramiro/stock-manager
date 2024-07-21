'use client'
import { useState, useEffect, lazy, Suspense } from "react";
import Topbar from "./Topbar";
const ChartComponent2 = lazy(() => import('./assets/ChartComponent2'));
const AreaChartComponent =lazy(() => import('./assets/AreaChartComponent'));
import { useRouter } from 'next/navigation'


export default function Maincontent () {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const router = useRouter()

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
      router.push('/')
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

        if (response.status === 401) { 
          await refreshToken();
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        if (error.message.includes('401')) {
          router.push('/')
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
        <article className="charts flex flex-col md:flex-row w-full gap-y-12 gap-x-8">
          <div className="chart1 md:w-1/2 h-72 md:h-96 p-0 md:p-4 bg-gray-50 shadow-sm rounded-md">
            <Suspense fallback={<div>Loading Chart Component...</div>}>
              <AreaChartComponent token={token} />
            </Suspense>
          </div>
          <div className="chart2 md:w-1/2 h-72 md:h-96 p-4 bg-gray-50 shadow-sm rounded-md">
            <Suspense fallback={<div>Loading Chart Component...</div>}>
              <ChartComponent2 token={token} />
            </Suspense>
          </div>
        </article>
      </section>
    </main>
    )
}