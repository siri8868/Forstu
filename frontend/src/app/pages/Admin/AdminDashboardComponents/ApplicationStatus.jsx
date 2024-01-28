import { Box, Heading } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getTotalSubmitCountOfApplicationApi } from "../../../api/DashboardApi/DashboardApi";

function ApplicationStatus() {
  const [totalStatus, setTotalStatus] = useState({});

  const data = {
    series: [totalStatus?.submittedCountData, totalStatus?.pendingCountData],
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      labels: [
        `submitted ${totalStatus?.submittedCountData}`,
        `pending ${totalStatus?.pendingCountData}`,
      ],
      colors: ["#1d3162", "#df7135", "#f6bb61", "#e5e2dc"],
      legend: {
        show: true,

        fontSize: "16px",
        position: "bottom",
        verticalAlign: "bottom",
        offsetX: 0,
        offsetY: 0,
      },
    },
  };
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

  return (
    <Box
      h="400px"
      padding={"10px"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Heading as="h4" size="sm" mb={4} ml={2}>
        Application Status
      </Heading>
      <div id="chart">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="pie"
          height={300}
        />
      </div>
    </Box>
  );
}

export default ApplicationStatus;
