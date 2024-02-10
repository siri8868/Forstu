import React, { useContext, useEffect, useState } from "react";
// import { formContext } from "../FormDashboard";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  getOtherInfoApi,
  submitFormDataApi,
} from "../../../api/FormApi/FormApi";
import { getOTPSecret } from "../../../helpers/AuthHelpers";
import { getOccpationListApi } from "../../../api/FormApi/FormDropdownApi";

function FormThree() {
  const [formData, setFormData] = useState({});
  const [occupationList, setOccupationList] = useState([]);

  const toast = useToast();

  const handleChange = (param) => (event) => {
    setFormData({ ...formData, [param]: event.target.value });
  };

  const getOtherInfo = () => {
    const studentMail = getOTPSecret().to;
    const data = {
      email: studentMail,
    };
    getOtherInfoApi(data)
      .then((res) => {
        console.log("res getOtherInfo", res.data[0]);
        setFormData(res.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getoccpationlistData = () => {
    getOccpationListApi()
      .then((res) => {
        // console.log("res getOccpationListApi", res);
        setOccupationList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getOtherInfo();
    getoccpationlistData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("formData", formData);
    const data = {
      id: formData.id,
      isFatherAlive: formData.isFatherAlive,
      fatherName: formData.fatherName,
      fatherOccupation: formData.fatherOccupation,
      fatherSalaried: formData.fatherSalaried,
      motherAlive: formData.motherAlive,
      motherName: formData.motherName,
      motherOccupation: formData.motherOccupation,
      isMotherSalaried: formData.isMotherSalaried,
    };

    console.log("data", data);
    submitFormDataApi(data)
      .then((res) => {
        if (res.success) {
          toast({
            title: "OtherInfo Details Updated.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          // onClose();
          toast({
            title: "Operation failed!",
            description: res.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Operation Failed!",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });

        console.error(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box maxW="md" mx="auto" mt="8">
          <VStack spacing="4">
            <FormControl id="id" display={"none"}>
              <FormLabel>id</FormLabel>
              <Input
                type="text"
                placeholder="Enter your id"
                value={formData.id}
                onChange={handleChange("id")}
              />
            </FormControl>
            <FormControl id="isFatherAlive">
              <FormLabel>Is Father Alive?</FormLabel>
              <Input
                type="text"
                placeholder="Is Father Alive?"
                value={formData.isFatherAlive}
                onChange={handleChange("isFatherAlive")}
              />
            </FormControl>

            <FormControl id="fatherName">
              <FormLabel>Father Name</FormLabel>
              <Input
                type="text"
                placeholder="Father Name"
                value={formData.fatherName}
                onChange={handleChange("fatherName")}
              />
            </FormControl>

            {/* <FormControl id="fatherOccupation">
              <FormLabel>Father Occupation</FormLabel>
              <Input
                type="text"
                placeholder="Father Occupation"
                value={formData.fatherOccupation}
                onChange={handleChange("fatherOccupation")}
              />
            </FormControl> */}

            <FormControl id="fatherOccupation">
              <FormLabel>Father Occupation</FormLabel>
              <Select
                placeholder="Select your Father Occupation"
                value={formData.fatherOccupation}
                onChange={handleChange("fatherOccupation")}
                required
              >
                {occupationList?.map((status, index) => (
                  <option key={index} value={status.occu_name}>
                    {status.occu_name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="fatherSalaried">
              <FormLabel>Father Is Salaried?</FormLabel>
              <Input
                type="text"
                placeholder="Father Is Salaried?"
                value={formData.fatherSalaried}
                onChange={handleChange("fatherSalaried")}
              />
            </FormControl>

            <FormControl id="motherAlive">
              <FormLabel>Is Mother Alive?</FormLabel>
              <Input
                type="text"
                placeholder="Is Mother Alive?"
                value={formData.motherAlive}
                onChange={handleChange("motherAlive")}
              />
            </FormControl>

            <FormControl id="motherName">
              <FormLabel>Mother Name</FormLabel>
              <Input
                type="text"
                placeholder="motherName"
                value={formData.motherName}
                onChange={handleChange("motherName")}
              />
            </FormControl>

            {/* <FormControl id="motherOccupation">
              <FormLabel>mother Occupation</FormLabel>
              <Input
                type="text"
                placeholder="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleChange("motherOccupation")}
              />
            </FormControl> */}

            <FormControl id="motherOccupation">
              <FormLabel>Mother Occupation</FormLabel>
              <Select
                placeholder="Select your Mother Occupation"
                value={formData.motherOccupation}
                onChange={handleChange("motherOccupation")}
                required
              >
                {occupationList?.map((status, index) => (
                  <option key={index} value={status.occu_name}>
                    {status.occu_name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="isMotherSalaried">
              <FormLabel>Is Mother Salaried</FormLabel>
              <Input
                type="text"
                placeholder="isMotherSalaried"
                value={formData.isMotherSalaried}
                onChange={handleChange("isMotherSalaried")}
              />
            </FormControl>
          </VStack>
          <Button
            color="text.light"
            type="submit"
            bg="primary.main"
            variant={"outline"}
            mt={2}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
}

export default FormThree;
