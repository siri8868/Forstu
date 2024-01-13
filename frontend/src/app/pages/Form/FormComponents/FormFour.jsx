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

function FormFour({ formDataMain }) {
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
      admissionYear: formData.admissionYear,
      instituteState: formData.instituteState,
      instituteDistrict: formData.instituteDistrict,
      instituteTaluka: formData.instituteTaluka,
      qualificationLevel: formData.qualificationLevel,
      courseStream: formData.courseStream,
      instituteName: formData.instituteName,
      coursename: formData.coursename,
      admissionType: formData.admissionType,
      cetPercentAge: formData.cetPercentAge,
      admissionApplicationId: formData.admissionApplicationId,
      admissionLetterDoc: formData.admissionLetterDoc,
      currentYear: formData.currentYear,
      isCompletedPursuing: formData.isCompletedPursuing,
      admissionDate: formData.admissionDate,
      feesPaid: formData.feesPaid,
      feeReceiptDoc: formData.feeReceiptDoc,
      admissionCategory: formData.admissionCategory,
      modeStudy: formData.modeStudy,
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
            <FormControl id="admissionYear">
              <FormLabel>Admission Year In Current Course</FormLabel>
              <Input
                type="text"
                placeholder="Admission Year In Current Course"
                value={formData.admissionYear}
                onChange={handleChange("admissionYear")}
                required
              />
            </FormControl>

            <FormControl id="instituteState">
              <FormLabel>Institute State</FormLabel>
              <Input
                type="text"
                placeholder="Institute State"
                value={formData.instituteState}
                onChange={handleChange("instituteState")}
                required
              />
            </FormControl>

            <FormControl id="instituteDistrict">
              <FormLabel>Institute District</FormLabel>
              <Input
                type="text"
                placeholder="Institute District"
                value={formData.instituteDistrict}
                onChange={handleChange("instituteDistrict")}
                required
              />
            </FormControl>

            <FormControl id="instituteTaluka">
              <FormLabel>Institute Taluka</FormLabel>
              <Input
                type="text"
                placeholder="Institute Taluka"
                value={formData.instituteTaluka}
                onChange={handleChange("instituteTaluka")}
                required
              />
            </FormControl>

            <FormControl id="qualificationLevel">
              <FormLabel>Qualification Level</FormLabel>
              <Input
                type="text"
                placeholder="Qualification Level"
                value={formData.qualificationLevel}
                onChange={handleChange("qualificationLevel")}
                required
              />
            </FormControl>

            <FormControl id="courseStream">
              <FormLabel>Course Stream</FormLabel>
              <Input
                type="text"
                placeholder="Course Stream"
                value={formData.courseStream}
                onChange={handleChange("courseStream")}
                required
              />
            </FormControl>

            <FormControl id="instituteName">
              <FormLabel>institute Name</FormLabel>
              <Input
                type="text"
                placeholder="institute Name"
                value={formData.instituteName}
                onChange={handleChange("instituteName")}
                required
              />
            </FormControl>

            <FormControl id="coursename">
              <FormLabel>Course name</FormLabel>
              <Input
                type="text"
                placeholder="Course name"
                value={formData.coursename}
                onChange={handleChange("coursename")}
                required
              />
            </FormControl>

            <FormControl id="admissionType">
              <FormLabel>Course name</FormLabel>
              <Input
                type="text"
                placeholder="Course name"
                value={formData.admissionType}
                onChange={handleChange("admissionType")}
                required
              />
            </FormControl>

            <FormControl id="cetPercentAge">
              <FormLabel>Cet Percentage</FormLabel>
              <Input
                type="text"
                placeholder="Cet Percentage"
                value={formData.cetPercentAge}
                onChange={handleChange("cetPercentAge")}
                required
              />
            </FormControl>

            <FormControl id="admissionApplicationId">
              <FormLabel>Admission Application Id</FormLabel>
              <Input
                type="text"
                placeholder="Admission Application Id"
                value={formData.admissionApplicationId}
                onChange={handleChange("admissionApplicationId")}
                required
              />
            </FormControl>

            <FormControl id="admissionLetterDoc">
              <FormLabel>Admission Letter Doc</FormLabel>
              <Input
                type="text"
                placeholder="Admission Letter Doc"
                value={formData.admissionLetterDoc}
                onChange={handleChange("admissionLetterDoc")}
                required
              />
            </FormControl>

            <FormControl id="currentYear">
              <FormLabel>current Year</FormLabel>
              <Input
                type="text"
                placeholder="current Year"
                value={formData.currentYear}
                onChange={handleChange("currentYear")}
                required
              />
            </FormControl>

            <FormControl id="isCompletedPursuing">
              <FormLabel>Year of study</FormLabel>
              <Input
                type="text"
                placeholder="Year of study"
                value={formData.isCompletedPursuing}
                onChange={handleChange("isCompletedPursuing")}
                required
              />
            </FormControl>

            <FormControl id="admissionDate">
              <FormLabel>Admission Date</FormLabel>
              <Input
                type="text"
                placeholder="Admission Date"
                value={formData.admissionDate}
                onChange={handleChange("admissionDate")}
                required
              />
            </FormControl>

            <FormControl id="feesPaid">
              <FormLabel>fees Paid</FormLabel>
              <Input
                type="text"
                placeholder="fees Paid"
                value={formData.feesPaid}
                onChange={handleChange("feesPaid")}
                required
              />
            </FormControl>

            <FormControl id="feeReceiptDoc">
              <FormLabel>fee Receipt Doc</FormLabel>
              <Input
                type="text"
                placeholder="fee Receipt Doc"
                value={formData.feeReceiptDoc}
                onChange={handleChange("feeReceiptDoc")}
                required
              />
            </FormControl>

            <FormControl id="admissionCategory">
              <FormLabel>Admission Category</FormLabel>
              <Input
                type="text"
                placeholder="Admission Category"
                value={formData.admissionCategory}
                onChange={handleChange("admissionCategory")}
                required
              />
            </FormControl>

            <FormControl id="modeStudy">
              <FormLabel>mode Study</FormLabel>
              <Input
                type="text"
                placeholder="mode Study"
                value={formData.modeStudy}
                onChange={handleChange("modeStudy")}
                required
              />
            </FormControl>

            <FormControl id="modeStudy">
              <FormLabel>mode Study</FormLabel>
              <Input
                type="text"
                placeholder="mode Study"
                value={formData.modeStudy}
                onChange={handleChange("modeStudy")}
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

export default FormFour;
