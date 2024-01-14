import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  getHostelDetailsInfoApi,
  submitFormDataApi,
} from "../../../api/FormApi/FormApi";

function FormSix() {
  const [formData, setFormData] = useState({});
  const toast = useToast();

  const handleChange = (param) => (event) => {
    setFormData({ ...formData, [param]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("formData", formData);
    const data = {
      id: formData.id,
      areYouHostellerDayScholar: formData.areYouHostellerDayScholar,
      hostelState: formData.hostelState,
      hostelDistrict: formData.hostelDistrict,
      hostelTaluka: formData.hostelTaluka,
      hostelType: formData.hostelType,
      hostelName: formData.hostelName,
      hostelAddress: formData.hostelAddress,
      hostelPincode: formData.hostelPincode,
      hostelAdmissionDate: formData.hostelAdmissionDate,
      hostelDoc: formData.hostelDoc,
    };

    console.log("data", data);
    submitFormDataApi(data)
      .then((res) => {
        if (res.success) {
          toast({
            title: "Hostel Details Info Details Updated.",
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

  const getHostelDetailsInfo = () => {
    const data = {
      email: "nishant@gmail.com",
    };
    getHostelDetailsInfoApi(data)
      .then((res) => {
        console.log("res  -- getHostelDetailsInfo", res.data[0]);
        setFormData(res.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getHostelDetailsInfo();
  }, []);

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
                required
              />
            </FormControl>
            <FormControl id="areYouHostellerDayScholar">
              <FormLabel>Are you a Hosteller or Day Scholar</FormLabel>
              <Input
                type="text"
                placeholder="Are you a Hosteller or Day Scholar"
                value={formData.areYouHostellerDayScholar}
                onChange={handleChange("areYouHostellerDayScholar")}
                required
              />
            </FormControl>

            <FormControl id="hostelState">
              <FormLabel>Hostel State</FormLabel>
              <Input
                type="text"
                placeholder="Hostel State"
                value={formData.hostelState}
                onChange={handleChange("hostelState")}
                required
              />
            </FormControl>

            <FormControl id="hostelDistrict">
              <FormLabel>Hostel District</FormLabel>
              <Input
                type="text"
                placeholder="Hostel District"
                value={formData.hostelDistrict}
                onChange={handleChange("hostelDistrict")}
                required
              />
            </FormControl>

            <FormControl id="hostelTaluka">
              <FormLabel>Hostel Taluka</FormLabel>
              <Input
                type="text"
                placeholder="Hostel Taluka"
                value={formData.hostelTaluka}
                onChange={handleChange("hostelTaluka")}
                required
              />
            </FormControl>

            <FormControl id="hostelType">
              <FormLabel>Hostel Type</FormLabel>
              <Input
                type="text"
                placeholder="Hostel Type"
                value={formData.hostelType}
                onChange={handleChange("hostelType")}
                required
              />
            </FormControl>

            <FormControl id="hostelName">
              <FormLabel>Hostel Name</FormLabel>
              <Input
                type="text"
                placeholder="Hostel Name"
                value={formData.hostelName}
                onChange={handleChange("hostelName")}
                required
              />
            </FormControl>

            <FormControl id="hostelAddress">
              <FormLabel>Hostel Address</FormLabel>
              <Input
                type="text"
                placeholder="Hostel Address"
                value={formData.hostelAddress}
                onChange={handleChange("hostelAddress")}
                required
              />
            </FormControl>

            <FormControl id="hostelPincode">
              <FormLabel>Hostel Pin Code</FormLabel>
              <Input
                type="text"
                placeholder="Hostel Pin Code"
                value={formData.hostelPincode}
                onChange={handleChange("hostelPincode")}
                required
              />
            </FormControl>

            <FormControl id="hostelAdmissionDate">
              <FormLabel>Hostel Admission Date</FormLabel>
              <Input
                type="text"
                placeholder="Hostel Admission Date"
                value={formData.hostelAdmissionDate}
                onChange={handleChange("hostelAdmissionDate")}
                required
              />
            </FormControl>

            <FormControl id="hostelDoc">
              <FormLabel>Hostel Docs</FormLabel>
              <Input
                type="text"
                placeholder="Hostel Docs"
                value={formData.hostelDoc}
                onChange={handleChange("hostelDoc")}
                required
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

export default FormSix;
