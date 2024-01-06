import { Box } from "@chakra-ui/layout";
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

  const getTotalSubmitCountByCaste = () => {
    getTotalSubmitCountOfApplicationByCasteApi()
      .then((res) => {
        if (res.success) {
          console.log("getTotalSubmitCountOfApplicationApi", res.data);
          const counts = res.data.map((item) => item.count_per_category);
          console.log("counts", counts);
          setCountPerCategory(counts);
          // const categories = responseData.data.map(
          //   (item) => item.CasteCategory
          // );

          console.log("counts", counts);

          // setTotalSubmitCountOfApplicationByItsCaste(res.data);
        } else {
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
