import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function YearAndCourseStatus() {
  const optionsForPie = {
    series: [10, 20],
    options: {
      series: [55, 55],
      options: {
        chart: {
          type: "donut",
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
          type="donut"
          // width={380}
          height={350}
        />
      </div>
    </Box>
  );
}

export default YearAndCourseStatus;
