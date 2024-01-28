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
import {
  getcurrentcourseInfoApi,
  submitFormDataApi,
} from "../../../api/FormApi/FormApi";
import { getOTPSecret } from "../../../helpers/AuthHelpers";

function FormFour() {
  const [formData, setFormData] = useState({});
  //   const [data, setData] = useState([]);
  const toast = useToast();

  const handleChange = (param) => (event) => {
    setFormData({ ...formData, [param]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("formData", formData);
    const data = {
      id: formData.id,
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

  const getcurrentcourseInfo = () => {
    const studentMail = getOTPSecret().to;
    const data = {
      email: studentMail,
    };
    getcurrentcourseInfoApi(data)
      .then((res) => {
        console.log("res -- getcurrentcourseInfo", res.data[0]);
        setFormData(res.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getcurrentcourseInfo();
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
              <FormLabel>Institute Name</FormLabel>
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
              <FormLabel>Admission Type</FormLabel>
              <Input
                type="text"
                placeholder="Enter Your Admission Type"
                value={formData.admissionType}
                onChange={handleChange("admissionType")}
                required
              />
            </FormControl>

            <FormControl id="cetPercentAge">
              <FormLabel>CET / JEE Percentage</FormLabel>
              <Input
                type="text"
                placeholder="Cet Percentage"
                value={formData.cetPercentAge}
                onChange={handleChange("cetPercentAge")}
                required
              />
            </FormControl>

            <FormControl id="admissionApplicationId">
              <FormLabel>
                Application Admission ID/CAP ID/CLAT Admit Card No
              </FormLabel>
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
              <FormLabel>Year Of Study</FormLabel>
              <Input
                type="text"
                placeholder="current Year"
                value={formData.currentYear}
                onChange={handleChange("currentYear")}
                required
              />
            </FormControl>

            <FormControl id="isCompletedPursuing">
              <FormLabel>Year Of Study Completed Or Pursuing</FormLabel>
              <Input
                type="text"
                placeholder="Enter Your Year Of Study Completed Or Pursuing"
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
              <FormLabel>Fees Paid</FormLabel>
              <Input
                type="text"
                placeholder="fees Paid"
                value={formData.feesPaid}
                onChange={handleChange("feesPaid")}
                required
              />
            </FormControl>

            <FormControl id="feeReceiptDoc">
              <FormLabel>
                Upload Fees/Admission Receipt/bonafide certificate
              </FormLabel>
              <Input
                type="text"
                placeholder="Upload Fees/Admission Receipt/bonafide certificate"
                value={formData.feeReceiptDoc}
                onChange={handleChange("feeReceiptDoc")}
                required
              />
            </FormControl>

            <FormControl id="admissionCategory">
              <FormLabel>
                Is Admission Through Open Or Reserved Category ?
              </FormLabel>
              <Input
                type="text"
                placeholder="Is Admission Through Open Or Reserved Category ?"
                value={formData.admissionCategory}
                onChange={handleChange("admissionCategory")}
                required
              />
            </FormControl>

            <FormControl id="modeStudy">
              <FormLabel>Mode Of Study</FormLabel>
              <Input
                type="text"
                placeholder="Mode Of Study"
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
