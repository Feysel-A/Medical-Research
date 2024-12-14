import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const AgeDistributionChart = ({ patientData }) => {
  //   console.log(patientData);
  // Process data to group ages into ranges
  const ageGroups = [
    { name: "0–18", count: 0 },
    { name: "19–35", count: 0 },
    { name: "36–50", count: 0 },
    { name: "51+", count: 0 },
  ];

  patientData?.forEach((patient) => {
    const age = patient.patient.age;
    if (age <= 18) ageGroups[0].count += 1;
    else if (age <= 35) ageGroups[1].count += 1;
    else if (age <= 50) ageGroups[2].count += 1;
    else ageGroups[3].count += 1;
  });

  return (
    <div>
      <BarChart
        width={600}
        height={300}
        data={ageGroups}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#007bff" />
      </BarChart>
    </div>
  );
};

export default AgeDistributionChart;
