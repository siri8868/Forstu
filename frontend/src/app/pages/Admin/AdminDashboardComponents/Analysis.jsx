import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  InputGroup,
} from "@chakra-ui/react";
import {
  getMonthlySubmitCountApi,
  getYearlySubmitCountApi,
} from "../../../api/DashboardApi/DashboardApi";

function Analysis() {
  const [filter, setFilter] = useState("Day");
  const [chartData, setChartData] = useState({
    series: [],
    categories: [],
  });

  const handleChange = (param) => (event) => {
    setFilter({ ...filter, [param]: event.target.value });
    console.log("filter", event.target.value);
    if (event.target.value === "Day") {
      console.log("Day");
    } else if (event.target.value === "Month") {
      console.log("Month");
      getMonthlySubmitCount();
    } else if (event.target.value === "Year") {
      console.log("Year");
      getYearlySubmitCount();
    }
  };

  const optionsForPie = {
    series: [
      {
        name: "Desktops",
        data: chartData.series,
      },
    ],
    options: {
      chart: {
        width: 300,
        type: "line",
      },
      // labels: categories,
      // colors: ["#1d3162", "#df7135", "#f6bb61", "#e5e2dc"],
      // legend: {
      //   fontSize: "13px",
      //   position: "bottom",
      //   verticalAlign: "bottom",
      //   offsetX: 0,
      //   offsetY: 0,
      // },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Trends by Month",
        align: "left",
      },
      // grid: {
      //   row: {
      //     colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      //     opacity: 0.5,
      //   },
      // },
      xaxis: {
        categories: chartData.categories,
      },
    },
  };

  const getMonthlySubmitCount = () => {
    getMonthlySubmitCountApi()
      .then((res) => {
        const monthMapping = {
          1: "Jan",
          2: "Feb",
          3: "Mar",
          4: "Apr",
          5: "May",
          6: "Jun",
          7: "Jul",
          8: "Aug",
          9: "Sep",
          10: "Oct",
          11: "Nov",
          12: "Dec",
        };
        console.log("getMonthlySubmitCountApi", res);
        const Month = res?.monthCount?.map((item) => item.Month);
        const count = res.monthCount.map((item) => item.count);
        const monthNames = Month.map(
          (monthNumber) => monthMapping[monthNumber]
        );
        // console.log("monthNames", monthNames);
        setChartData({
          series: count,
          categories: monthNames,
        });
        // console.log("Month", Month);

        console.log("count", count);

        // const months = monthCount.map((entry) => {
        //   const monthNames = [
        //     "Jan",
        //     "Feb",
        //     "Mar",
        //     "Apr",
        //     "May",
        //     "Jun",
        //     "Jul",
        //     "Aug",
        //     "Sep",
        //     "Oct",
        //     "Nov",
        //     "Dec",
        //   ];

        //   const monthIndex = entry.Month - 1; // Months are 1-indexed in your data
        //   return monthNames[monthIndex];
        // });

        // const counts = monthCount.map((entry) => entry.count);

        // console.log("Months:", months);
        // console.log("Counts:", counts);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getYearlySubmitCount = () => {
    getYearlySubmitCountApi()
      .then((res) => {
        console.log("getYearlySubmitCount", res.yearCount);
        const Year = res.yearCount.map((item) => item.Year);
        const count = res.yearCount.map((item) => item.YearCount);

        setChartData({
          series: count,
          categories: Year,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log("chartData", chartData);

  const data = ["Day", "Month", "Year"];

  return (
    <>
      <Box
      // display={"flex"}
      // flexDirection={"row"}
      // justifyContent={"center"}
      >
        <form onSubmit={""} style={{ display: "flex", padding: "10px" }}>
          <FormControl id="select">
            <FormLabel>Select</FormLabel>
            <Select
              placeholder="Select Filters"
              // value={role}
              // onChange={(event) => setRole(event.target.value)}
              onChange={handleChange("Month")}
              required
            >
              {data.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* <FormControl id="role" ml={"3"}>
            <FormLabel>Week</FormLabel>
            <Select
              placeholder="Select Role"
              // value={role}
              // onChange={(event) => setRole(event.target.value)}
              required
            >
              {week.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="role" ml={"3"}>
            <FormLabel>Month</FormLabel>
            <Select
              placeholder="Select Role"
              // value={role}
              // onChange={(event) => setRole(event.target.value)}
              required
            >
              {month.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          </FormControl> */}
        </form>
      </Box>
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
            //   options={optionsForPie}
            //   series={optionsForPie.series}
            //   type="bar"
            options={optionsForPie.options}
            series={optionsForPie.series}
            type="line"
            height={350}
          />
        </div>
      </Box>
    </>
  );
}

export default Analysis;
