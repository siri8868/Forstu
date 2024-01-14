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
          type: "pie",
        },
        labels: ["Submitted", "Pending"],
        colors: ["#1d3162", "#df7135"],
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

  console.log("optionsForPie", optionsForPie);

  // const optionsForPie = {
  //   series: [
  //     // userData.cloudname == "aws" ? aws : 0,
  //     // userData.cloudname == "azure" ? aws : 0,
  //     // userData.cloudname == "gcp" ? aws : 0,
  //     0, 0, 0,
  //   ],
  //   options: {
  //     chart: {
  //       width: 300,
  //       type: "pie",
  //     },
  //     labels: ["AWS", "AZURE", "GCP"],
  //     colors: ["#1d3162", "#df7135", "#f6bb61", "#e5e2dc"],
  //     legend: {
  //       show: false,
  //       floating: true,
  //       horizontalAlign: "center",
  //       fontSize: "16px",
  //       position: "center",
  //       verticalAlign: "center",
  //       offsetX: 0,
  //       offsetY: 0,
  //       labels: {
  //         useSeriesColors: true,
  //       },
  //       markers: {
  //         size: 0,
  //       },
  //     },

  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             width: 200,
  //           },
  //           legend: {
  //             position: "bottom",
  //           },
  //         },
  //       },
  //     ],
  //   },
  // };

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
