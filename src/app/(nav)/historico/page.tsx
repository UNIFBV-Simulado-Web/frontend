"use client";

import { useEffect, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useUserAnswerStore } from "@/store/userAnswerStore";
import {
  Card,
  CardTitle,
  CenteredMessage,
  ChartsGrid,
  DashboardContainer,
  Header,
  PageSubtitle,
  PageTitle,
} from "./styles";

const PIE_COLORS = ["#22c55e", "#ef4444"];
const BAR_COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const DashboardPage = () => {
  const { answers, isLoading, error, fetchAnswers } = useUserAnswerStore();

  useEffect(() => {
    if (answers.length === 0) {
      fetchAnswers();
    }
  }, [fetchAnswers, answers.length]);

  const { performanceData, overallDistribution } = useMemo(() => {
    const disciplines = {
      matematica: { correct: 0, total: 0, name: "Matemática" },
      linguagens: { correct: 0, total: 0, name: "Linguagens" },
      "ciencias-humanas": { correct: 0, total: 0, name: "Ciências Humanas" },
      "ciencias-natureza": {
        correct: 0,
        total: 0,
        name: "Ciências da Natureza",
      },
    };

    answers.forEach((answer) => {
      const disciplineKey = answer.question
        .discipline as keyof typeof disciplines;
      if (disciplineKey && disciplines[disciplineKey]) {
        disciplines[disciplineKey].total += 1;
        if (answer.isCorrect) {
          disciplines[disciplineKey].correct += 1;
        }
      }
    });

    const performance = Object.values(disciplines).map((discipline) => ({
      name: discipline.name,
      total: discipline.total,
      data: [
        { name: "Corretas", value: discipline.correct },
        { name: "Incorretas", value: discipline.total - discipline.correct },
      ],
    }));

    const distribution = Object.values(disciplines).map((discipline) => ({
      name: discipline.name,
      "Questões Respondidas": discipline.total,
    }));

    return { performanceData: performance, overallDistribution: distribution };
  }, [answers]);

  if (isLoading && answers.length === 0) {
    return <CenteredMessage>A carregar o seu desempenho...</CenteredMessage>;
  }

  if (error) {
    return (
      <CenteredMessage>Erro ao carregar os dados: {error}</CenteredMessage>
    );
  }

  if (answers.length === 0) {
    return (
      <CenteredMessage>
        Nenhuma questão respondida ainda. Complete um quiz para ver suas
        estatísticas!
      </CenteredMessage>
    );
  }

  return (
    <>
      <DashboardContainer>
        <Header>
          <PageTitle>Seu Desempenho</PageTitle>
          <PageSubtitle>
            Análise de acertos e erros por área de conhecimento.
          </PageSubtitle>
        </Header>

        <Card style={{ marginBottom: "1.5rem" }}>
          <CardTitle>Distribuição Total de Questões Respondidas</CardTitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={overallDistribution}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                cursor={{ fill: "#374151" }}
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                }}
              />
              <Legend />
              <Bar dataKey="Questões Respondidas" name="Total de Questões">
                {overallDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={BAR_COLORS[index % BAR_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <ChartsGrid>
          {performanceData.map((chartData, index) => {
            if (chartData.total === 0) return null;

            return (
              <Card key={index}>
                <CardTitle>{chartData.name}</CardTitle>
                <p
                  style={{
                    color: "#9ca3af",
                    marginBottom: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  Total de Questões: {chartData.total}
                </p>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData.data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {chartData.data.map((entry, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={PIE_COLORS[idx % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            );
          })}
        </ChartsGrid>
      </DashboardContainer>
    </>
  );
};

export default DashboardPage;
