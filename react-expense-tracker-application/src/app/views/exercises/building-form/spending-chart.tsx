import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { IExpense } from './interfaces';

interface Props {
    expenses: IExpense[];
}

const COLORS = ['#6366f1', '#22c55e', '#f59e0b'];

const SpendingChart = ({ expenses }: Props) => {
    const data = Object.entries(
        expenses.reduce<Record<string, number>>((acc, expense) => {
            const category = expense.category ?? 'unknown';
            acc[category] = (acc[category] ?? 0) + parseFloat(expense.amount ?? '0');
            return acc;
        }, {})
    ).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }));

    if (!data.length) return null;

    return (
        <div>
            <h2 className="mb-4 text-sm font-medium text-foreground">
                Spending by category
            </h2>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        labelLine={false}
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                            const RADIAN = Math.PI / 180;
                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                            return percent > 0.05 ? (
                                <text
                                    x={x}
                                    y={y}
                                    fill="white"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fontSize={12}
                                    fontWeight={500}
                                >
                                    {`${(percent * 100).toFixed(0)}%`}
                                </text>
                            ) : null;
                        }}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number) => [`$${value}`, 'Amount']}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingChart;
