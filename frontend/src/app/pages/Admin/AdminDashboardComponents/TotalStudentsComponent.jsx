import { Box } from "@chakra-ui/layout";
import React from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

function TotalStudentsComponent() {
  return (
    <Box
      h="400px"
      //   bg={"#fff"}
      padding={"10px"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      //   alignItems={"center"}
      //   paddingLeft={"20px"}
      //   margin={"20px"}
    >
      <Box mb={"20px"} bg={"#FFE7C1"} p={"20px"} borderRadius={"20px"}>
        <Stat>
          <StatLabel>Total Students</StatLabel>
          <StatNumber>23</StatNumber>
        </Stat>
      </Box>

      <Box bg={"#FFE7C1"} p={"20px"} borderRadius={"20px"}>
        <Stat>
          <StatLabel>Total Eligible</StatLabel>
          <StatNumber>23</StatNumber>
        </Stat>
      </Box>
    </Box>
  );
}

export default TotalStudentsComponent;
