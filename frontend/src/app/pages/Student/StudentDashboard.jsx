import React from "react";
import Base from "../../components/Base";
import { Box } from "@chakra-ui/react";
import { Table as AntTable } from "antd";

function StudentDashboard() {
  const onChange = (pagination, filters, sorter, extra) => {};

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      filterSearch: true,
      //   onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      //   sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Name",
      dataIndex: "institute_choice_code",
      filterSearch: true,
      // filters: userNameFilterList,

      //   onFilter: (value, record) =>
      //     record.institute_choice_code.indexOf(value) === 0,
      //   sorter: (a, b) => {
      //     // Compare names as strings for alphabetical order
      //     return a.name.localeCompare(b.name);
      //   },
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Course Name",
      dataIndex: "institute_name",
      filterSearch: true,
      // filters: userRoleFilterList,

      //   onFilter: (value, record) => record.institute_name.indexOf(value) === 0,
      //   sorter: (a, b) => {
      //     // Compare usernames as strings for alphabetical order
      //     return a.institute_name.localeCompare(b.role);
      //   },
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Course Current Year",
      dataIndex: "institute_state",
      filterSearch: true,
      // filters: userRoleFilterList,

      //   onFilter: (value, record) => record.institute_state.indexOf(value) === 0,
      //   sorter: (a, b) => {
      //     // Compare usernames as strings for alphabetical order
      //     return a.institute_state.localeCompare(b.role);
      //   },
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Action",
      // key: 'action',
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
      //                   <ConformEditCollage
      //                     collage={record}
      //                     getAllColleges={getAllColleges}
      //                   />
      //                 </MenuItem>
      //                 <MenuItem py={"-0.3"}>
      //                   <ConformDeleteCollage
      //                     id={record.id}
      //                     getAllColleges={getAllColleges}
      //                   />
      //                 </MenuItem>
      //               </>
      //             </MenuList>
      //           </Menu>
      //         )}
      //       </>
      //     );
      //   },
    },
  ];

  return (
    <Base>
      <div>StudentDashboard</div>
      <Box bg="white" my={3}>
        <AntTable
          rowKey={"id"}
          columns={columns}
          // dataSource={college}
          onChange={onChange}
          bordered={true}
          loading={false}
        />
      </Box>
    </Base>
  );
}

export default StudentDashboard;
