import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getTotalSubmitCountOfApplicationByCasteApi } from "../../../api/DashboardApi/DashboardApi";

function CasteWiseApplicationSubmit() {
  const [totalSubmitCountOfApplication, setTotalSubmitCountOfApplication] =
    useState(0);

  const getTotalSubmitCountByCaste = () => {
    getTotalSubmitCountOfApplicationByCasteApi()
      .then((res) => {
        if (res.success) {
          console.log("getTotalSubmitCountOfApplicationApi", res.data);
          // setTotalEligible(res.data);
        } else {
          // setTotalEligible([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTotalSubmitCountByCaste();
  }, []);

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
