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

function FormThree({ formDataMain }) {
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
      isFatherAlive: formData.isFatherAlive,
      fatherName: formData.fatherName,
      fatherOccupation: formData.fatherOccupation,
      fatherSalaried: formData.fatherSalaried,
      motherAlive: formData.motherAlive,
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
            <FormControl id="isFatherAlive">
              <FormLabel>Is Father Alive?</FormLabel>
              <Input
                type="text"
                placeholder="Is Father Alive?"
                value={formData.isFatherAlive}
                onChange={handleChange("isFatherAlive")}
                required
              />
            </FormControl>

            <FormControl id="fatherName">
              <FormLabel>Father Name</FormLabel>
              <Input
                type="text"
                placeholder="Father Name"
                value={formData.fatherName}
                onChange={handleChange("fatherName")}
                required
              />
            </FormControl>

            <FormControl id="fatherOccupation">
              <FormLabel>Father Occupation</FormLabel>
              <Input
                type="text"
                placeholder="Father Occupation"
                value={formData.fatherOccupation}
                onChange={handleChange("fatherOccupation")}
                required
              />
            </FormControl>

            <FormControl id="fatherSalaried">
              <FormLabel>Father Is Salaried?</FormLabel>
              <Input
                type="text"
                placeholder="Father Is Salaried?"
                value={formData.fatherSalaried}
                onChange={handleChange("fatherSalaried")}
                required
              />
            </FormControl>

            <FormControl id="motherAlive">
              <FormLabel>Is Mother Alive?</FormLabel>
              <Input
                type="text"
                placeholder="Is Mother Alive?"
                value={formData.motherAlive}
                onChange={handleChange("motherAlive")}
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

export default FormThree;
