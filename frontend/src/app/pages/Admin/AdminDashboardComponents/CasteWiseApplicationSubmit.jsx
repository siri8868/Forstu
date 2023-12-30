import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function CasteWiseApplicationSubmit() {
  //   const [chartData, setChartData] = useState();

  const optionsForPie = {
    series: [44, 55, 13, 43, 22],
    options: {
      series: [44, 55, 41, 17, 15],
      options: {
        chart: {
          type: "pie",
        },
        legend: {
          show: false,
        },

        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    },
  };

  return (
    <Box
      h="400px"
      //   bg={"#fff"}
      padding={"10px"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <div id="chart">
        <ReactApexChart
          options={optionsForPie.options}
          series={optionsForPie.series}
          //   type="bar"
          type="pie"
          // width={380}
          height={350}
        />
      </div>
    </Box>
  );
}

export default CasteWiseApplicationSubmit;
