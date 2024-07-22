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

const ChartComponent2 = ({ token }) => {
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

        const categoryQuantities = products.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + product.quantity;
          return acc;
        }, {});

        const formattedData = Object.entries(categoryQuantities).map(([name, quantity]) => ({
          name,
          quantity,
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
    quantity: {
      label: "Quantity",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Quantities by Category</CardTitle>
        <CardDescription>Quantity data for different product categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 14, fill: '#333' }} />
              <YAxis tickFormatter={(tick) => tick.toLocaleString()} tick={{ fontSize: 14, fill: '#333' }} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="quantity" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing quantity for product categories
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartComponent2;
