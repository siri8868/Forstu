import { Box, Heading } from "@chakra-ui/layout";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function SystemAnalysisComponent() {
  //   const [chartData, setChartData] = useState();

  const optionsForPie = {
    series: [
      {
        data: [12, 22, 7],
      },
    ],

    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["System Error", "Adhar Card Link", "Login Failed"],
      },
    },
  };

  return (
    <Box
      h="400px"
      //   bg={"#fff"}
      // padding={"10px"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Heading as="h4" size="sm" mb={3} ml={2} mt={4}>
        Application submition failed status
      </Heading>
      <div id="chart">
        <ReactApexChart
          //   options={optionsForPie}
          //   series={optionsForPie.series}
          //   type="bar"
          options={optionsForPie.options}
          series={optionsForPie.series}
          type="bar"
          height={350}
        />
      </div>
    </Box>
  );
}

export default SystemAnalysisComponent;
