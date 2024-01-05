import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getTotalSubmitCountOfApplicationApi } from "../../../api/DashboardApi/DashboardApi";

function ApplicationStatus() {
  const [totalStatus, setTotalStatus] = useState({});

  const getTotalSubmitOfApplication = () => {
    getTotalSubmitCountOfApplicationApi()
      .then((res) => {
        if (res.success) {
          setTotalStatus(res.data);
        } else {
          setTotalStatus([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTotalSubmitOfApplication();
  }, []);

  const optionsForPie = {
    series: [totalStatus?.submittedCountData, totalStatus?.pendingCountData],
    options: {
      // series: [20, 20],
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
      <h1>Application Status</h1>
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

export default ApplicationStatus;
