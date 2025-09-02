import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid
} from "recharts";

interface DynamicPriceChartProps {
  gameData: any; // Objeto do jogo (ex: theLastOfUsPartI)
}

function prepareChartData(region: string, edition: string, gameData: any) {
  const entries = gameData[region];
  if (!entries) return [];

  return Object.entries(entries).map(([date, items]) => {
    const item = items.find((i: any) => i.edition === edition);
    return item ? { date, price: item.price, discount: item.discount ?? 0 } : null;
  }).filter(Boolean);
}

export default function DynamicPriceChart({ gameData }: DynamicPriceChartProps) {
  const [selectedEdition, setSelectedEdition] = useState("Standard Edition");

  const regions = ["Argentina", "Brazil", "Europe", "UnitedStates", "UnitedKingdom"];
  const regionColors: Record<string, string> = {
    Argentina: "#82ca9d",
    Brazil: "#8884d8",
    Europe: "#ffc658",
    UnitedStates: "#ff7300",
    UnitedKingdom: "#387908",
  };

  const regionData = regions.reduce<Record<string, any[]>>((acc, region) => {
    acc[region] = prepareChartData(region, selectedEdition, gameData);
    return acc;
  }, {});

  const allDates = Array.from(
    new Set(Object.values(regionData).flatMap(d => d.map(i => i.date)))
  ).sort();

  const chartData = allDates.map(date => {
    const obj: any = { date };
    regions.forEach(region => {
      const entry = regionData[region].find(d => d.date === date);
      obj[region + "Price"] = entry?.price;
      obj[region + "Discount"] = entry?.discount;
    });
    return obj;
  });

  return (
    <div style={{ width: "100%", height: "800px" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Selecionar edição:{" "}
          <select
            value={selectedEdition}
            onChange={(e) => setSelectedEdition(e.target.value)}
          >
            <option value="Standard Edition">Standard Edition</option>
            <option value="Deluxe Edition">Deluxe Edition</option>
            <option value="PS4">PS4</option>
          </select>
        </label>
      </div>

      {/* Gráfico de Preços */}
      <h3>Preço ({selectedEdition})</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value: any) => [value, "Preço"]} />
          <Legend />
          {regions.map(region => (
            <Line
              key={region}
              type="monotone"
              dataKey={region + "Price"}
              stroke={regionColors[region]}
              name={region}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Gráfico de Descontos */}
      <h3>Descontos (%)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(value: any) => [value + "%", "Desconto"]} />
          <Legend />
          {regions.map(region => (
            <Line
              key={region + "-discount"}
              type="monotone"
              dataKey={region + "Discount"}
              stroke={regionColors[region]}
              name={region}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}