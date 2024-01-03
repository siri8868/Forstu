import React, { useState } from "react";
import Base from "../../components/Base";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Spacer,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

function YearAndCoursesDashboard() {
  const [yearCourseData, setYearCourseData] = useState({});

  const handleChange = (param) => (event) => {
    console.log("handle change");
    setYearCourseData({ ...yearCourseData, [param]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
  };

  return (
    <Base>
      <Box py={5} px={5} bg={"text.light"} borderWidth="1px" borderRadius="lg">
        <Flex>
          <Box>
            {/* <Heading as="h4" size={"md"} my={2}>
              User List
            </Heading> */}

            <form onSubmit={handleSubmit}>
              <Box maxW="md" mx="auto" mt="8">
                <FormControl id="year">
                  <FormLabel>Year</FormLabel>
                  <Select
                    placeholder="Select Year"
                    value={yearCourseData.year}
                    onChange={handleChange("year")}
                    required
                  >
                    {/* {roles.map((role, index) => (
                        <option key={index} value={role}>
                          {role}
                        </option>
                      ))} */}
                  </Select>
                </FormControl>

                <FormControl id="course">
                  <FormLabel>Course</FormLabel>
                  <Select
                    placeholder="Select Course"
                    value={yearCourseData.course}
                    onChange={handleChange("course")}
                    required
                  >
                    {/* {roles.map((role, index) => (
                        <option key={index} value={role}>
                          {role}
                        </option>
                      ))} */}
                  </Select>
                </FormControl>
              </Box>
              <Button
                color="text.light"
                type="submit"
                bg="primary.main"
                variant={"outline"}
              >
                Submit
              </Button>
            </form>
          </Box>
          <Spacer />
        </Flex>
      </Box>
    </Base>
  );
}

export default YearAndCoursesDashboard;
