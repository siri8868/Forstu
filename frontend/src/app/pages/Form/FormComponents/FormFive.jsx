import React, { useContext, useEffect, useState } from "react";
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
  getQualificationInfoApi,
  submitFormDataApi,
} from "../../../api/FormApi/FormApi";
import { getOTPSecret } from "../../../helpers/AuthHelpers";
import {
  getHSCAdmissionYearApi,
  getSSCAdmissionYearApi,
  getSSCExamMonthApi,
} from "../../../api/FormApi/FormDropdownApi";

function FormFive() {
  const [formData, setFormData] = useState({});
  const [sscAdmissionYear, setSSCAdmissionYear] = useState([]);
  const [hscAdmissionYear, setHSCAdmissionYear] = useState([]);
  const [sscExamMonth, setSSCExamMonth] = useState([]);
  const [stateOfHaveGap, setStateOfHaveGap] = useState(false);

  //   const [data, setData] = useState([]);
  const toast = useToast();

  const listForHaveGap = ["Yes", "No"];

  const handleChangeForHaveGapDropDown = (param) => (event) => {
    const newValue = event.target.value;
    setStateOfHaveGap(newValue === "Yes");
    setFormData({ ...formData, [param]: newValue });
  };

  const handleChange = (param) => (event) => {
    setFormData({ ...formData, [param]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formData", formData);
    const data = {
      id: formData.id,
      class10Qualification: formData.class10Qualification,
      class10Stream: formData.class10Stream,
      class10State: formData.class10State,
      class10District: formData.class10District,
      class10Taluka: formData.class10Taluka,
      class10Course: formData.class10Course,
      class10Board: formData.class10Board,
      class10Mode: formData.class10Mode,
      class10AdmissionYear: formData.class10AdmissionYear,
      class10PassingYear: formData.class10PassingYear,
      class10Result: formData.class10Result,
      class10Percentage: formData.class10Percentage,
      class10Attempt: formData.class10Attempt,
      class10Doc: formData.class10Doc,
      class10SeatNumber: formData.class10SeatNumber,
      class10MonthOfExam: formData.class10MonthOfExam,
      class10MarksObtained: formData.class10MarksObtained,
      class10Attempts: formData.class10Attempts,
      class12QualificationLevel: formData.class12QualificationLevel,
      class12Stream: formData.class12Stream,
      class12InstituteState: formData.class12InstituteState,
      class12InstituteDistrict: formData.class12InstituteDistrict,
      class12Taluka: formData.class12Taluka,
      class12CollegeName: formData.class12CollegeName,
      class12Course: formData.class12Course,
      class12Board: formData.class12Board,
      class12SeatNumber: formData.class12SeatNumber,
      class12Mode: formData.class12Mode,
      class12AdmissionYear: formData.class12AdmissionYear,
      class12PassingYear: formData.class12PassingYear,
      class12Result: formData.class12Result,
      class12Percentage: formData.class12Percentage,
      class12Attempts: formData.class12Attempts,
      class12Doc: formData.class12Doc,
      doYouHaveGap: formData.doYouHaveGap,
      gapYear: formData.gapYear,
      gapDoc: formData.gapDoc,
    };

    console.log("data", data);

    submitFormDataApi(data)
      .then((res) => {
        if (res.success) {
          toast({
            title: "Qualification Info Details Updated.",
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

  const getQualificationInfo = () => {
    const studentMail = getOTPSecret().to;
    const data = {
      email: studentMail,
    };
    getQualificationInfoApi(data)
      .then((res) => {
        console.log("res -- getQualificationInfo", res.data[0]);
        setFormData(res.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getSSCAdmissionYearData = () => {
    getSSCAdmissionYearApi()
      .then((res) => {
        // console.log("res getSSCAdmissionYearApi", res);
        setSSCAdmissionYear(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getHSCAdmissionYearData = () => {
    getHSCAdmissionYearApi()
      .then((res) => {
        // console.log("res getHSCAdmissionYearApi", res);
        setHSCAdmissionYear(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getSSCExamMonthData = () => {
    getSSCExamMonthApi()
      .then((res) => {
        // console.log("res getSSCExamMonthApi", res);
        setSSCExamMonth(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getQualificationInfo();
    getSSCAdmissionYearData();
    getHSCAdmissionYearData();
    getSSCExamMonthData();
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
              />
            </FormControl>
            <FormControl id="class10Qualification">
              <FormLabel>Class 10th Qualification Level</FormLabel>
              <Input
                type="text"
                placeholder="class 10th Qualification Level"
                value={formData.class10Qualification}
                onChange={handleChange("class10Qualification")}
              />
            </FormControl>

            <FormControl id="class10Stream">
              <FormLabel>Class 10th Stream</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Stream"
                value={formData.class10Stream}
                onChange={handleChange("class10Stream")}
              />
            </FormControl>

            <FormControl id="class10State">
              <FormLabel>Class 10th State</FormLabel>
              <Input
                type="text"
                placeholder="Class 10th State"
                value={formData.class10State}
                onChange={handleChange("class10State")}
              />
            </FormControl>

            <FormControl id="class10District">
              <FormLabel>Class 10th District</FormLabel>
              <Input
                type="text"
                placeholder="class 10th District"
                value={formData.class10District}
                onChange={handleChange("class10District")}
              />
            </FormControl>

            <FormControl id="class10Taluka">
              <FormLabel>Class 10th Taluka</FormLabel>
              <Input
                type="text"
                placeholder="class 10th Taluka"
                value={formData.class10Taluka}
                onChange={handleChange("class10Taluka")}
              />
            </FormControl>

            <FormControl id="class10Course">
              <FormLabel>Class 10th Course</FormLabel>
              <Input
                type="text"
                placeholder="class 10th Course"
                value={formData.class10Course}
                onChange={handleChange("class10Course")}
              />
            </FormControl>

            <FormControl id="class10Board">
              <FormLabel>Class 10th Board</FormLabel>
              <Input
                type="text"
                placeholder="class 10th Board"
                value={formData.class10Board}
                onChange={handleChange("class10Board")}
              />
            </FormControl>

            <FormControl id="class10Mode">
              <FormLabel>Class 10th Mode</FormLabel>
              <Input
                type="text"
                placeholder="class 10th Mode"
                value={formData.class10Mode}
                onChange={handleChange("class10Mode")}
              />
            </FormControl>

            {/* <FormControl id="class10AdmissionYear">
              <FormLabel>Class 10th Admission Year</FormLabel>
              <Input
                type="text"
                placeholder="class 10th Admission Year"
                value={formData.class10AdmissionYear}
                onChange={handleChange("class10AdmissionYear")}
              />
            </FormControl> */}
            <FormControl id="class10AdmissionYear">
              <FormLabel>Class 10th Admission Year</FormLabel>
              <Select
                placeholder="Select your Class 10th Admission Year"
                value={formData.class10AdmissionYear}
                onChange={handleChange("class10AdmissionYear")}
              >
                {sscAdmissionYear?.map((status, index) => (
                  <option key={index} value={status.year}>
                    {status.year}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="class10PassingYear">
              <FormLabel>Class 10th Passing Year</FormLabel>
              <Input
                type="text"
                placeholder="class 10th Passing Year"
                value={formData.class10PassingYear}
                onChange={handleChange("class10PassingYear")}
              />
            </FormControl>

            <FormControl id="class10Result">
              <FormLabel>Class 10th Result</FormLabel>
              <Input
                type="text"
                placeholder="class 10th Result"
                value={formData.class10Result}
                onChange={handleChange("class10Result")}
              />
            </FormControl>

            <FormControl id="class10Percentage">
              <FormLabel>Class 10th Percentage</FormLabel>
              <Input
                type="text"
                placeholder="class 10th Percentage"
                value={formData.class10Percentage}
                onChange={handleChange("class10Percentage")}
              />
            </FormControl>

            <FormControl id="class10Attempt">
              <FormLabel>Class 10th Attempt</FormLabel>
              <Input
                type="text"
                placeholder="class 10th Attempt"
                value={formData.class10Attempt}
                onChange={handleChange("class10Attempt")}
              />
            </FormControl>

            <FormControl id="class10Doc">
              <FormLabel>Class 10th Doc</FormLabel>
              <Input
                type="text"
                placeholder="class 10th Doc"
                value={formData.class10Doc}
                onChange={handleChange("class10Doc")}
              />
            </FormControl>

            <FormControl id="class10SeatNumber">
              <FormLabel>Class 10th Seat Number</FormLabel>
              <Input
                type="text"
                placeholder="class 10th Seat Number"
                value={formData.class10SeatNumber}
                onChange={handleChange("class10SeatNumber")}
              />
            </FormControl>

            {/* <FormControl id="class10MonthOfExam">
              <FormLabel>Class 10th Month Of Exam</FormLabel>
              <Input
                type="text"
                placeholder="Class 10th Month Of Exam"
                value={formData.class10MonthOfExam}
                onChange={handleChange("class10MonthOfExam")}
              />
            </FormControl> */}
            <FormControl id="class10MonthOfExam">
              <FormLabel>Class 10th Month Of Exam</FormLabel>
              <Select
                placeholder="Select your Class 10th Month Of Exam"
                value={formData.class10MonthOfExam}
                onChange={handleChange("class10MonthOfExam")}
              >
                {sscExamMonth?.map((status, index) => (
                  <option key={index} value={status.month}>
                    {status.month}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="class10MarksObtained">
              <FormLabel>Class 10th Marks Obtained</FormLabel>
              <Input
                type="text"
                placeholder="class 10th Obtained"
                value={formData.class10MarksObtained}
                onChange={handleChange("class10MarksObtained")}
              />
            </FormControl>

            <FormControl id="class10Attempts">
              <FormLabel>Class 10th Attempts</FormLabel>
              <Input
                type="text"
                placeholder="class 10th Attempts"
                value={formData.class10Attempts}
                onChange={handleChange("class10Attempts")}
              />
            </FormControl>

            <FormControl id="class12QualificationLevel">
              <FormLabel>Class 12th Qualification Level</FormLabel>
              <Input
                type="text"
                placeholder="class 12th Qualification Level"
                value={formData.class12QualificationLevel}
                onChange={handleChange("class12QualificationLevel")}
              />
            </FormControl>

            <FormControl id="class12Stream">
              <FormLabel>Class 12th Stream</FormLabel>
              <Input
                type="text"
                placeholder="class 12th Stream"
                value={formData.class12Stream}
                onChange={handleChange("class12Stream")}
              />
            </FormControl>

            <FormControl id="class12InstituteState">
              <FormLabel>Class 12th Institute State</FormLabel>
              <Input
                type="text"
                placeholder="class 12th Institute State"
                value={formData.class12InstituteState}
                onChange={handleChange("class12InstituteState")}
              />
            </FormControl>

            <FormControl id="class12InstituteDistrict">
              <FormLabel>Class 12th Institute District</FormLabel>
              <Input
                type="text"
                placeholder="class 12th Institute District"
                value={formData.class12InstituteDistrict}
                onChange={handleChange("class12InstituteDistrict")}
              />
            </FormControl>

            <FormControl id="class12Taluka">
              <FormLabel>Class 12th Institute Taluka</FormLabel>
              <Input
                type="text"
                placeholder="class 12th Institute Taluka"
                value={formData.class12Taluka}
                onChange={handleChange("class12Taluka")}
              />
            </FormControl>

            <FormControl id="class12CollegeName">
              <FormLabel>Class 12th Collage Name</FormLabel>
              <Input
                type="text"
                placeholder="class 12th Collage Name"
                value={formData.class12CollegeName}
                onChange={handleChange("class12CollegeName")}
              />
            </FormControl>

            <FormControl id="class12Course">
              <FormLabel>Class 12th Course</FormLabel>
              <Input
                type="text"
                placeholder="class 12th Course"
                value={formData.class12Course}
                onChange={handleChange("class12Course")}
              />
            </FormControl>

            <FormControl id="class12Board">
              <FormLabel>Class 12th Board</FormLabel>
              <Input
                type="text"
                placeholder="Class 12th Board"
                value={formData.class12Board}
                onChange={handleChange("class12Board")}
              />
            </FormControl>

            <FormControl id="class12SeatNumber">
              <FormLabel>Class 12th Seat Number</FormLabel>
              <Input
                type="text"
                placeholder="Class 12th Seat Number"
                value={formData.class12SeatNumber}
                onChange={handleChange("class12SeatNumber")}
              />
            </FormControl>

            <FormControl id="class12Mode">
              <FormLabel>Class 12th Mode</FormLabel>
              <Input
                type="text"
                placeholder="Class 12th Mode"
                value={formData.class12Mode}
                onChange={handleChange("class12Mode")}
              />
            </FormControl>

            {/* <FormControl id="class12AdmissionYear">
              <FormLabel>Class 12th Admission Year</FormLabel>
              <Input
                type="text"
                placeholder="Class 12th Admission Year"
                value={formData.class12AdmissionYear}
                onChange={handleChange("class12AdmissionYear")}
              />
            </FormControl> */}
            <FormControl id="class12AdmissionYear">
              <FormLabel>Class 12th Admission Year</FormLabel>
              <Select
                placeholder="Select your Class 12th Admission Year"
                value={formData.class12AdmissionYear}
                onChange={handleChange("class12AdmissionYear")}
              >
                {hscAdmissionYear?.map((status, index) => (
                  <option key={index} value={status.year}>
                    {status.year}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="class12PassingYear">
              <FormLabel>Class 12th Passing Year</FormLabel>
              <Input
                type="text"
                placeholder="Class 12th Passing Year"
                value={formData.class12PassingYear}
                onChange={handleChange("class12PassingYear")}
              />
            </FormControl>

            <FormControl id="class12Result">
              <FormLabel>Class 12th Result</FormLabel>
              <Input
                type="text"
                placeholder="Class 12th Result"
                value={formData.class12Result}
                onChange={handleChange("class12Result")}
              />
            </FormControl>

            <FormControl id="class12Percentage">
              <FormLabel>Class 12th Percentage</FormLabel>
              <Input
                type="text"
                placeholder="Class 12th Percentage"
                value={formData.class12Percentage}
                onChange={handleChange("class12Percentage")}
              />
            </FormControl>

            <FormControl id="class12Attempts">
              <FormLabel>Class 12th Attempts</FormLabel>
              <Input
                type="text"
                placeholder="Class 12th Attempts"
                value={formData.class12Attempts}
                onChange={handleChange("class12Attempts")}
              />
            </FormControl>

            <FormControl id="class12Doc">
              <FormLabel>Class 12th Docs</FormLabel>
              <Input
                type="text"
                placeholder="Class 12th Docs"
                value={formData.class12Doc}
                onChange={handleChange("class12Doc")}
              />
            </FormControl>

            {/* <FormControl id="doYouHaveGap">
              <FormLabel>Do You Have Gap</FormLabel>
              <Input
                type="text"
                placeholder="Do You Have Gap"
                value={formData.doYouHaveGap}
                onChange={handleChange("doYouHaveGap")}
              />
            </FormControl> */}
            <FormControl id="doYouHaveGap">
              <FormLabel>Do You Have Gap</FormLabel>

              <Select
                placeholder="Select your Admission Type"
                value={formData.doYouHaveGap}
                onChange={handleChangeForHaveGapDropDown("doYouHaveGap")}
              >
                {listForHaveGap?.map((status, index) => {
                  // console.log("status", status);
                  return (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            {stateOfHaveGap && (
              <>
                <FormControl id="gapYear">
                  <FormLabel>Gap Year</FormLabel>
                  <Input
                    type="text"
                    placeholder="Gap Year"
                    value={formData.gapYear}
                    onChange={handleChange("gapYear")}
                  />
                </FormControl>

                <FormControl id="gapDoc">
                  <FormLabel>Gap Document</FormLabel>
                  <Input
                    type="text"
                    placeholder="Gap Document"
                    value={formData.gapDoc}
                    onChange={handleChange("gapDoc")}
                  />
                </FormControl>
              </>
            )}
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

export default FormFive;
