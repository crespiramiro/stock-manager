"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const AreaChartComponent = ({ token }) => {
  const [chartData, setChartData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch("http://localhost:8080/api/products", {
          method: "GET",
          headers: headers,
        });

        if (response.status === 401) {
          await refreshToken();
          return;
        }

        if (!response.ok) {
          throw new Error("Request Error");
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
          averagePrice: data.total / data.count,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching product data:", error);

        if (error.message.includes("401")) {
          router.push("/");
        }
      }
    };

    fetchData();
  }, [token]);

  const chartConfig = {
    averagePrice: {
      label: "Average Price",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Price by Category</CardTitle>
        <CardDescription>Price data for various product categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 14, fill: '#333' }} />
              <YAxis tickFormatter={(tick) => `$${tick.toLocaleString()}`} tick={{ fontSize: 14, fill: '#333' }} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="averagePrice" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing average price for product categories
        </div>
      </CardFooter>
    </Card>
  );
};

export default AreaChartComponent;
