//Hook para estraer datos de testimonios de examen Bexa de un Archivo Excel
// hooks/useExcelData.ts
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import excelFile from "../assets/excel/encuesta.xlsx";

interface ChartData {
  name: string;
  value: number;
}

interface CommentData {
  columna3: string;
  columna13: string;
}

interface UseExcelDataResult {
  chartData: Record<string, ChartData[]>;
  comments: CommentData[];
}

const useExcelData = (): UseExcelDataResult => {
  const [chartData, setChartData] = useState<Record<string, ChartData[]>>({});
  const [comments, setComments] = useState<CommentData[]>([]);

  const countOccurrences = (responses: string[]): Record<string, number> => {
    return responses.reduce((acc, response) => {
      acc[response] = (acc[response] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const formatData = (counts: Record<string, number>): ChartData[] => {
    return Object.entries(counts).map(([key, value]) => ({ name: key, value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(excelFile);
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        });

        const newChartData: Record<string, ChartData[]> = {};
        for (let i = 5; i <= 11; i++) {
          const responses = jsonData.map((row) => row[i]).filter(Boolean);
          newChartData[`chartData${i - 4}`] = formatData(countOccurrences(responses));
        }

        const keys = Object.keys(newChartData);
        const reorderedKeys = [
          ...keys.slice(-3),
          ...keys.slice(1, -3),
          keys[0],
        ];

        const orderedData = reorderedKeys.reduce((acc, key) => {
          acc[key] = newChartData[key];
          return acc;
        }, {} as Record<string, ChartData[]>);

        setChartData(orderedData);

        const filteredComments: CommentData[] = jsonData.slice(1)
          .map((row) => (row[12] ? { columna3: row[2], columna13: row[12] } : null))
          .filter(Boolean) as CommentData[];

        setComments(filteredComments);
      } catch (error) {
        console.error("Error loading Excel file:", error);
      }
    };

    fetchData();
  }, []);

  return { chartData, comments };
};

export default useExcelData;
