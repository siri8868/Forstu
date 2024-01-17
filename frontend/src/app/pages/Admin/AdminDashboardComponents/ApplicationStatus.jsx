import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getTotalSubmitCountOfApplicationApi } from "../../../api/DashboardApi/DashboardApi";

function ApplicationStatus() {
  const [totalStatus, setTotalStatus] = useState({});

  // const [chartData, setChartData] = useState({
  //   series: [],
  //   options: {},
  // });

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
        // floating: true,
        // horizontalAlign: "center",
        fontSize: "16px",
        position: "bottom",
        verticalAlign: "bottom",
        offsetX: 0,
        offsetY: 0,
        // labels: {
        //   useSeriesColors: true,
        // },
        // itemMargin: {
        //   horizontal: 5,
        //   vertical: 0,
        // },
        // markers: {
        //   size: 0,
        // },
      },

      // responsive: [
      //   {
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 300,
      //       },
      //       legend: {
      //         position: "bottom",
      //       },
      //     },
      //   },
      // ],
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

  // useEffect(() => {
  //   getTotalSubmitOfApplication();
  // }, []);

  useEffect(() => {
    getTotalSubmitOfApplication();
    // Fetch data and update chartData state
    // setChartData(data);
  }, []);

  // const optionsForPie = {
  //   series: [totalStatus?.submittedCountData, totalStatus?.pendingCountData],
  //   options: {
  //     // series: [20, 20],
  //     options: {
  //       chart: {
  //         type: "pie",
  //       },
  //       labels: ["Submitted", "Pending"],
  //       colors: ["#1d3162", "#df7135"],
  //       responsive: [
  //         {
  //           breakpoint: 480,
  //           options: {
  //             chart: {
  //               width: 200,
  //             },
  //             legend: {
  //               position: "bottom",
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  // };

  // console.log("optionsForPie", optionsForPie);

  return (
    <Box
      h="400px"
      padding={"10px"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      {/* <h1>Application Status</h1> */}
      <div id="chart">
        {/* <ReactApexChart
          options={optionsForPie.options}
          series={optionsForPie.series}
          type="donut"
          width={380}
          height={350}
        /> */}

        <ReactApexChart
          options={data.options}
          series={data.series}
          type="pie"
          // width={300}
          height={300}
        />
      </div>
    </Box>
  );
}

export default ApplicationStatus;
