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

function FormFive({ formDataMain }) {
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
            <FormControl id="class10Qualification">
              <FormLabel>class 10 Qualification Level</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Qualification Level"
                value={formData.class10Qualification}
                onChange={handleChange("class10Qualification")}
                required
              />
            </FormControl>

            <FormControl id="class10Stream">
              <FormLabel>class 10 Stream</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Stream"
                value={formData.class10Stream}
                onChange={handleChange("class10Stream")}
                required
              />
            </FormControl>

            <FormControl id="class10State">
              <FormLabel>class 10 State</FormLabel>
              <Input
                type="text"
                placeholder="class 10 State"
                value={formData.class10State}
                onChange={handleChange("class10State")}
                required
              />
            </FormControl>

            <FormControl id="class10District">
              <FormLabel>class 10 District</FormLabel>
              <Input
                type="text"
                placeholder="class 10 District"
                value={formData.class10District}
                onChange={handleChange("class10District")}
                required
              />
            </FormControl>

            <FormControl id="class10Taluka">
              <FormLabel>class 10 Taluka</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Taluka"
                value={formData.class10Taluka}
                onChange={handleChange("class10Taluka")}
                required
              />
            </FormControl>

            <FormControl id="class10Course">
              <FormLabel>class 10 Course</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Course"
                value={formData.class10Course}
                onChange={handleChange("class10Course")}
                required
              />
            </FormControl>

            <FormControl id="class10Board">
              <FormLabel>class 10 Board</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Board"
                value={formData.class10Board}
                onChange={handleChange("class10Board")}
                required
              />
            </FormControl>

            <FormControl id="class10Mode">
              <FormLabel>class 10 Mode</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Mode"
                value={formData.class10Mode}
                onChange={handleChange("class10Mode")}
                required
              />
            </FormControl>

            <FormControl id="class10AdmissionYear">
              <FormLabel>class 10 Admission Year</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Admission Year"
                value={formData.class10AdmissionYear}
                onChange={handleChange("class10AdmissionYear")}
                required
              />
            </FormControl>

            <FormControl id="class10PassingYear">
              <FormLabel>class 10 Passing Year</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Passing Year"
                value={formData.class10PassingYear}
                onChange={handleChange("class10PassingYear")}
                required
              />
            </FormControl>

            <FormControl id="class10Result">
              <FormLabel>class 10 Result</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Result"
                value={formData.class10Result}
                onChange={handleChange("class10Result")}
                required
              />
            </FormControl>

            <FormControl id="class10Percentage">
              <FormLabel>class 10 Percentage</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Percentage"
                value={formData.class10Percentage}
                onChange={handleChange("class10Percentage")}
                required
              />
            </FormControl>

            <FormControl id="class10Attempt">
              <FormLabel>class 10 Attempt</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Attempt"
                value={formData.class10Attempt}
                onChange={handleChange("class10Attempt")}
                required
              />
            </FormControl>

            <FormControl id="class10Doc">
              <FormLabel>class 10 Doc</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Doc"
                value={formData.class10Doc}
                onChange={handleChange("class10Doc")}
                required
              />
            </FormControl>

            <FormControl id="class10SeatNumber">
              <FormLabel>class 10 Seat Number</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Seat Number"
                value={formData.class10SeatNumber}
                onChange={handleChange("class10SeatNumber")}
                required
              />
            </FormControl>

            <FormControl id="class10MonthOfExam">
              <FormLabel>class 10 Month Of Exam</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Month Of Exam"
                value={formData.class10MonthOfExam}
                onChange={handleChange("class10MonthOfExam")}
                required
              />
            </FormControl>

            <FormControl id="class10MarksObtained">
              <FormLabel>class 10 Obtained</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Obtained"
                value={formData.class10MarksObtained}
                onChange={handleChange("class10MarksObtained")}
                required
              />
            </FormControl>

            <FormControl id="class10Attempts">
              <FormLabel>class 10 Attempts</FormLabel>
              <Input
                type="text"
                placeholder="class 10 Attempts"
                value={formData.class10Attempts}
                onChange={handleChange("class10Attempts")}
                required
              />
            </FormControl>

            <FormControl id="class12QualificationLevel">
              <FormLabel>class 12 Qualification Level</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Qualification Level"
                value={formData.class12QualificationLevel}
                onChange={handleChange("class12QualificationLevel")}
                required
              />
            </FormControl>

            <FormControl id="class12Stream">
              <FormLabel>class 12 Stream</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Stream"
                value={formData.class12Stream}
                onChange={handleChange("class12Stream")}
                required
              />
            </FormControl>

            <FormControl id="class12InstituteState">
              <FormLabel>class 12 Institute State</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Institute State"
                value={formData.class12InstituteState}
                onChange={handleChange("class12InstituteState")}
                required
              />
            </FormControl>

            <FormControl id="class12InstituteDistrict">
              <FormLabel>class 12 Institute District</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Institute District"
                value={formData.class12InstituteDistrict}
                onChange={handleChange("class12InstituteDistrict")}
                required
              />
            </FormControl>

            <FormControl id="class12Taluka">
              <FormLabel>class 12 Institute Taluka</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Institute Taluka"
                value={formData.class12Taluka}
                onChange={handleChange("class12Taluka")}
                required
              />
            </FormControl>

            <FormControl id="class12CollegeName">
              <FormLabel>class 12 Collage Name</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Collage Name"
                value={formData.class12CollegeName}
                onChange={handleChange("class12CollegeName")}
                required
              />
            </FormControl>

            <FormControl id="class12Course">
              <FormLabel>class 12 Course</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Course"
                value={formData.class12Course}
                onChange={handleChange("class12Course")}
                required
              />
            </FormControl>

            <FormControl id="class12Board">
              <FormLabel>class 12 Board</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Board"
                value={formData.class12Board}
                onChange={handleChange("class12Board")}
                required
              />
            </FormControl>

            <FormControl id="class12SeatNumber">
              <FormLabel>class 12 Seat Number</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Seat Number"
                value={formData.class12SeatNumber}
                onChange={handleChange("class12SeatNumber")}
                required
              />
            </FormControl>

            <FormControl id="class12Mode">
              <FormLabel>class 12 Mode</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Mode"
                value={formData.class12Mode}
                onChange={handleChange("class12Mode")}
                required
              />
            </FormControl>

            <FormControl id="class12AdmissionYear">
              <FormLabel>class 12 Admission Year</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Admission Year"
                value={formData.class12AdmissionYear}
                onChange={handleChange("class12AdmissionYear")}
                required
              />
            </FormControl>

            <FormControl id="class12PassingYear">
              <FormLabel>class 12 Passing Year</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Passing Year"
                value={formData.class12PassingYear}
                onChange={handleChange("class12PassingYear")}
                required
              />
            </FormControl>

            <FormControl id="class12Result">
              <FormLabel>class 12 Result</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Result"
                value={formData.class12Result}
                onChange={handleChange("class12Result")}
                required
              />
            </FormControl>

            <FormControl id="class12Percentage">
              <FormLabel>class 12 Percentage</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Percentage"
                value={formData.class12Percentage}
                onChange={handleChange("class12Percentage")}
                required
              />
            </FormControl>

            <FormControl id="class12Attempts">
              <FormLabel>class 12 Attempts</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Attempts"
                value={formData.class12Attempts}
                onChange={handleChange("class12Attempts")}
                required
              />
            </FormControl>

            <FormControl id="class12Doc">
              <FormLabel>class 12 Docs</FormLabel>
              <Input
                type="text"
                placeholder="class 12 Docs"
                value={formData.class12Doc}
                onChange={handleChange("class12Doc")}
                required
              />
            </FormControl>

            <FormControl id="doYouHaveGap">
              <FormLabel>Do You Have Gap</FormLabel>
              <Input
                type="text"
                placeholder="Do You Have Gap"
                value={formData.doYouHaveGap}
                onChange={handleChange("doYouHaveGap")}
                required
              />
            </FormControl>

            <FormControl id="gapYear">
              <FormLabel>Gap Year</FormLabel>
              <Input
                type="text"
                placeholder="Gap Year"
                value={formData.gapYear}
                onChange={handleChange("gapYear")}
                required
              />
            </FormControl>

            <FormControl id="gapDoc">
              <FormLabel>Gap Document</FormLabel>
              <Input
                type="text"
                placeholder="Gap Document"
                value={formData.gapDoc}
                onChange={handleChange("gapDoc")}
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

export default FormFive;
