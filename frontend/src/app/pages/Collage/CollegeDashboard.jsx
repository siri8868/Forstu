import React, { useEffect, useState } from "react";
import { Table as AntTable } from "antd";

import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
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

import Base from "../../components/Base";

import { HiCheckCircle } from "react-icons/hi";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { isAuthenticated } from "../../helpers/AuthHelpers";
import { convertToIst } from "../../helpers/Time";
import { getAllCollegesApi } from "../../api/College";

function CollegeDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [college, setCollegeList] = useState([]);
  const currentUser = isAuthenticated().user.username;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      filterSearch: true,
      // filters: userIdFilterList,
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Institute Choice Code",
      dataIndex: "institute_choice_code",
      filterSearch: true,
      // filters: userNameFilterList,

      onFilter: (value, record) =>
        record.institute_choice_code.indexOf(value) === 0,
      sorter: (a, b) => {
        // Compare names as strings for alphabetical order
        return a.name.localeCompare(b.name);
      },
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Institute Name",
      dataIndex: "institute_name",
      filterSearch: true,
      // filters: userRoleFilterList,

      onFilter: (value, record) => record.institute_name.indexOf(value) === 0,
      sorter: (a, b) => {
        // Compare usernames as strings for alphabetical order
        return a.institute_name.localeCompare(b.role);
      },
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Institute State",
      dataIndex: "institute_state",
      filterSearch: true,
      // filters: userRoleFilterList,

      onFilter: (value, record) => record.institute_state.indexOf(value) === 0,
      sorter: (a, b) => {
        // Compare usernames as strings for alphabetical order
        return a.institute_state.localeCompare(b.role);
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "CREATED AT",
      dataIndex: "createdAt",

      render: (_, record) => {
        return <Text>{convertToIst(record.createdAt)}</Text>;
      },
    },
    {
      title: "UPDATED AT",
      dataIndex: "updatedAt",

      render: (_, record) => {
        return <Text>{convertToIst(record.updatedAt)}</Text>;
      },
    },
    {
      title: "Action",
      // key: 'action',
      render: (_, record) => {
        return (
          <>
            {currentUser == record.name ? (
              <div
                style={{
                  color: "green",
                  alignSelf: "center",
                  display: "flex",
                  // alignItems: "center",
                  // justifyContent: "center",
                  marginLeft: 15,
                }}
              >
                <HiCheckCircle size={"20"} />
              </div>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  variant={"ghost"}
                  // rightIcon={<ChevronDownIcon />}
                >
                  <BsThreeDotsVertical />
                </MenuButton>
                <MenuList minWidth="50px">
                  <>
                    <MenuItem py={"-0.3"}>
                      {/* <ConformEditUser
                        user={record}
                        getAllUsers={getAllUsers}
                      /> */}
                    </MenuItem>
                    <MenuItem py={"-0.3"}>
                      {/* <ConformDelete id={record.id} getAllUsers={getAllUsers} /> */}
                    </MenuItem>
                  </>
                </MenuList>
              </Menu>
            )}
          </>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {};

  const getAllColleges = async () => {
    const res = await getAllCollegesApi();
    if (res.success) {
      console.log("MEMEMEMEME", res.data);
      setCollegeList(res.data);
      // setUserNameFilterList(generateFilterList(res.data, "name"));
      // setUserRoleFilterList(generateFilterList(res.data, "role"));
      // setUserIdFilterList(generateFilterList(res.data, "id"));
    } else {
      setCollegeList([]);
    }
  };

  useEffect(() => {
    getAllColleges();
  }, []);

  const generateFilterList = (list, key) => {
    let data = list.map((item) => item[key]);
    data = [...new Set(data)];
    return data.map((item) => ({ text: item, value: item }));
  };

  return (
    <>
      <Base>
        <Box
          py={5}
          px={5}
          bg={"text.light"}
          borderWidth="1px"
          borderRadius="lg"
        >
          <Flex>
            <Box>
              <Heading as="h4" size={"md"} my={2}>
                College List
              </Heading>
              <Breadcrumb
                spacing="8px"
                separator={<ChevronRightIcon color="gray.500" />}
                fontSize={15}
              >
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <NavLink to="/dashboard/admin">Dashboard</NavLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <NavLink to="/dashboard/admin/colleges">Colleges</NavLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>List</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <Spacer />
            <Box p="4">
              <Button
                variant={"solid"}
                bg="primary.main"
                color={"text.light"}
                px={4}
                onClick={onOpen}
              >
                <IoMdAdd
                  style={{
                    marginRight: "5px",
                  }}
                />
                New College
              </Button>

              <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                {/* <ModalContent>
                  <ModalHeader>Add User</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <AddUserForm onClose={onClose} getAllUsers={getAllUsers} />
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </ModalContent> */}
              </Modal>
            </Box>
          </Flex>
        </Box>
        {/* <TriStats userList={userList} statsData={statsData} /> */}
        <Box bg="white" my={3}>
          <AntTable
            rowKey={"id"}
            columns={columns}
            dataSource={college}
            onChange={onChange}
            bordered={true}
            loading={false}
          />
        </Box>
      </Base>
    </>
  );
}

export default CollegeDashboard;
