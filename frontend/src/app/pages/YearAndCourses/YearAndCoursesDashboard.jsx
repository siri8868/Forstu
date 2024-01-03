import React, { useState } from "react";
import Base from "../../components/Base";
import { Table as AntTable } from "antd";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Select,
  Text,
} from "@chakra-ui/react";

import YearAndCourseStatus from "./YearAndCoursesComponents/YearAndCourseStatus";
import YearAndCourseApplicationFailedStatus from "./YearAndCoursesComponents/YearAndCourseApplicationFailedStatus";

function YearAndCoursesDashboard() {
  const [yearCourseData, setYearCourseData] = useState({});
  const [yearAndCourseData, setYearAndCourseData] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      filterSearch: true,
      // filters: userIdFilterList,
      // onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Candidate Name",
      dataIndex: "Candidate_name",
      filterSearch: true,
      // filters: userNameFilterList,

      // onFilter: (value, record) => record.username.indexOf(value) === 0,
      sorter: (a, b) => {
        // Compare usernames as strings for alphabetical order
        return a.username.localeCompare(b.username);
      },
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Whatsapp Number",
      dataIndex: "whatsapp_number",
      filterSearch: true,
      // filters: userRoleFilterList,

      // onFilter: (value, record) => record.role.indexOf(value) === 0,
      sorter: (a, b) => {
        // Compare usernames as strings for alphabetical order
        return a.role.localeCompare(b.role);
      },
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Email",
      dataIndex: "email",
      filterSearch: true,
      // filters: userRoleFilterList,

      // onFilter: (value, record) => record.role.indexOf(value) === 0,
      sorter: (a, b) => {
        // Compare usernames as strings for alphabetical order
        return a.role.localeCompare(b.role);
      },
      sortDirections: ["ascend", "descend"],
    },

    // {
    //   title: "Action",
    //   // key: 'action',
    //   render: (_, record) => {
    //     return (
    //       <>
    //         {currentUser == record.name ? (
    //           <div
    //             style={{
    //               color: "green",
    //               alignSelf: "center",
    //               display: "flex",
    //               // alignItems: "center",
    //               // justifyContent: "center",
    //               marginLeft: 15,
    //             }}
    //           >
    //             <HiCheckCircle size={"20"} />
    //           </div>
    //         ) : (
    //           <Menu>
    //             <MenuButton
    //               as={Button}
    //               variant={"ghost"}
    //               // rightIcon={<ChevronDownIcon />}
    //             >
    //               <BsThreeDotsVertical />
    //             </MenuButton>
    //             <MenuList minWidth="50px">
    //               <>
    //                 <MenuItem py={"-0.3"}>
    //                   <ConformEditUser
    //                     user={record}
    //                     getAllUsers={getAllUsers}
    //                   />
    //                 </MenuItem>
    //                 <MenuItem py={"-0.3"}>
    //                   <ConformDelete id={record.id} getAllUsers={getAllUsers} />
    //                 </MenuItem>
    //               </>
    //             </MenuList>
    //           </Menu>
    //         )}
    //       </>
    //     );
    //   },
    // },
  ];

  const onChange = (pagination, filters, sorter, extra) => {};

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
      <Box bg={"text.light"} borderWidth="1px" borderRadius="lg">
        <Box p={5}>
          <Heading as="h4" size={"md"} my={2}>
            Select Year and Course
          </Heading>

          <form onSubmit={handleSubmit}>
            <Box
              display={"flex"}
              // justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                maxW="md"
                mt="8"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <FormControl id="year">
                  {/* <FormLabel>Year</FormLabel> */}
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
                  {/* <FormLabel>Course</FormLabel> */}
                  <Select
                    multiple={2}
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
                mt={4}
                color="text.light"
                type="submit"
                bg="primary.main"
                variant={"outline"}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
        {/* <Spacer /> */}
        {/* </Flex> */}
      </Box>
      <Box py={5} px={5} bg={"text.light"} borderWidth="1px" borderRadius="lg">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem w="100%" bg={"#fff"} borderRadius={"10px"}>
            <YearAndCourseStatus />
          </GridItem>
          <GridItem w="100%" bg={"#FFFBF5"} borderRadius={"10px"}>
            <YearAndCourseApplicationFailedStatus />
          </GridItem>
        </Grid>
      </Box>
      <Box bg="white" my={3}>
        <AntTable
          rowKey={"id"}
          columns={columns}
          dataSource={yearAndCourseData}
          onChange={onChange}
          bordered={true}
          loading={false}
        />
      </Box>
    </Base>
  );
}

export default YearAndCoursesDashboard;
