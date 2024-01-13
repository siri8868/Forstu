import React, { useContext, useEffect, useState } from "react";
import { formContext } from "../FormDashboard";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";

function FormSix({ formDataMain }) {
  const { formState, setFormState } = useContext(formContext);

  const [formData, setFormData] = useState({});
  //   const [data, setData] = useState([]);
  const toast = useToast();

  const handleChange = (param) => (event) => {
    setFormData({ ...formData, [param]: event.target.value });
  };

  const handlePrev = () => {
    setFormState({ ...formState, currentTabIndex: 0 });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formData", formData);
    const data = {
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

    // setFormState({ ...formState, currentTabIndex: 1 });

    // Do something with the form data, such as submit it to a backend server

    // const data = {
    //   id: collageData.id,
    //   institute_choice_code: collageData.institute_choice_code,
    //   institute_name: collageData.institute_name,
    //   institute_state: collageData.institute_state,
    // };

    // updateCollageApi(data)
    //   .then((res) => {
    //     if (res.success) {
    //       onClose();
    //       getAllColleges();
    //       toast({
    //         title: "Collage Updated.",
    //         description: res.message,
    //         status: "success",
    //         duration: 9000,
    //         isClosable: true,
    //         position: "top-right",
    //       });
    //     } else {
    //       onClose();
    //       toast({
    //         title: "Operation failed!",
    //         description: res.message,
    //         status: "error",
    //         duration: 9000,
    //         isClosable: true,
    //         position: "top-right",
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     toast({
    //       title: "Error",
    //       description: "Operation Failed!",
    //       status: "error",
    //       duration: 9000,
    //       isClosable: true,
    //       position: "top-right",
    //     });

    //     console.error(error);
    //   });
  };

  useEffect(() => {
    // setFormData(collage);
    setFormData(formDataMain);
    // console.log("formDataMain", formDataMain);
  }, [formDataMain]);
  console.log("formData", formData);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box maxW="md" mx="auto" mt="8">
          <VStack spacing="4">
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
