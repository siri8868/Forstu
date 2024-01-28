import { Box, Heading } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getTotalSubmitCountOfApplicationByCasteApi } from "../../../api/DashboardApi/DashboardApi";

function CasteWiseApplicationSubmit() {
  // const [
  //   totalSubmitCountOfApplicationByItsCaste,
  //   setTotalSubmitCountOfApplicationByItsCaste,
  // ] = useState(0);

  const [countPerCategory, setCountPerCategory] = useState([]);
  const [categories, setCategories] = useState([]);

  console.log("categories:::::::", categories);

  const getTotalSubmitCountByCaste = () => {
    getTotalSubmitCountOfApplicationByCasteApi()
      .then((res) => {
        if (res.success) {
          console.log("getTotalSubmitCountOfApplicationApi", res.data);
          const counts = res.data.map((item) => item.count_per_category);
          const CasteCategoryList = res.data.map((item) => item.CasteCategory);
          console.log("counts", counts);
          console.log("CasteCategoryList", CasteCategoryList);
          setCountPerCategory(counts);
          setCategories(CasteCategoryList);

          console.log("counts", counts);
        } else {
          console.log("getTotalSubmitCountOfApplicationApi", res.message);
          // setTotalSubmitCountOfApplicationByItsCaste([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTotalSubmitCountByCaste();
    console.log("countPerCategory", countPerCategory);
  }, []);

  const optionsForPie = {
    series: countPerCategory,
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      labels: categories,
      colors: ["#1d3162", "#df7135", "#f6bb61", "#e5e2dc"],
      legend: {
        fontSize: "13px",
        position: "bottom",
        verticalAlign: "bottom",
        offsetX: 0,
        offsetY: 0,
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
      {/* <h1>Caste Wise Application Submission</h1> */}
      <Heading as="h4" size="sm" mb={3} ml={2}>
        Caste Wise Application Submission
      </Heading>
      <div id="chart">
        <ReactApexChart
          options={optionsForPie.options}
          series={optionsForPie.series}
          type="pie"
          height={300}
        />
      </div>
    </Box>
  );
}

export default CasteWiseApplicationSubmit;
