import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  getAddressInfoApi,
  submitFormDataApi,
} from "../../../api/FormApi/FormApi";

function FormTwo() {
  const [formData, setFormData] = useState({});
  const toast = useToast();

  const handleChange = (param) => (event) => {
    setFormData({ ...formData, [param]: event.target.value });
  };

  // const handlePrev = () => {
  //   setFormState({ ...formState, currentTabIndex: 0 });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("formData", formData);
    const data = {
      id: formData.id,
      permanentVillage: formData.permanentVillage,
      correspoAddressSameAsPermanent: formData.correspoAddressSameAsPermanent,
      correspondanceDistrict: formData.correspondanceDistrict,
      correspondanceTaluka: formData.correspondanceTaluka,
      correspondanceAddress: formData.correspondanceAddress,
      correspondanceState: formData.correspondanceState,
      correspondanceVillage: formData.correspondanceVillage,
      correspondancePincode: formData.correspondancePincode,
    };
    console.log("data", data);

    submitFormDataApi(data)
      .then((res) => {
        if (res.success) {
          toast({
            title: "AddressInfo Details Updated.",
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

  const getAddressInfo = () => {
    const data = {
      email: "nishant@gmail.com",
    };
    getAddressInfoApi(data)
      .then((res) => {
        console.log("res -- getAddressInfo", res.data[0]);
        setFormData(res.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAddressInfo();
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
            <FormControl id="permanentVillage">
              <FormLabel>Enter your permanent Village</FormLabel>
              <Input
                type="text"
                placeholder="Enter your permanent Village"
                value={formData.permanentVillage}
                onChange={handleChange("permanentVillage")}
                required
              />
            </FormControl>

            <FormControl id="correspoAddressSameAsPermanent">
              <FormLabel>
                Is Correspondence Address same as Permanent?
              </FormLabel>
              <Input
                type="text"
                placeholder=" Is Correspondence Address same as Permanent?"
                value={formData.correspoAddressSameAsPermanent}
                onChange={handleChange("correspoAddressSameAsPermanent")}
                required
              />
            </FormControl>

            <FormControl id="correspondanceDistrict">
              <FormLabel>Enter your Correspondance District</FormLabel>
              <Input
                type="text"
                placeholder="Enter your Correspondance District"
                value={formData.correspondanceDistrict}
                onChange={handleChange("correspondanceDistrict")}
                required
              />
            </FormControl>

            <FormControl id="correspondanceDistrict">
              <FormLabel>Enter your Correspondance District</FormLabel>
              <Input
                type="text"
                placeholder="Enter your Correspondance District"
                value={formData.correspondanceDistrict}
                onChange={handleChange("correspondanceDistrict")}
                required
              />
            </FormControl>

            <FormControl id="correspondanceTaluka">
              <FormLabel>Enter your correspondance Taluka</FormLabel>
              <Input
                type="text"
                placeholder="Enter your correspondance Taluka"
                value={formData.correspondanceTaluka}
                onChange={handleChange("correspondanceTaluka")}
                required
              />
            </FormControl>

            <FormControl id="correspondanceAddress">
              <FormLabel>Enter your correspondance Address</FormLabel>
              <Input
                type="text"
                placeholder="Enter your correspondance Address"
                value={formData.correspondanceAddress}
                onChange={handleChange("correspondanceAddress")}
                required
              />
            </FormControl>

            <FormControl id="correspondanceState">
              <FormLabel>Enter your correspondance State</FormLabel>
              <Input
                type="text"
                placeholder="Enter your correspondance State"
                value={formData.correspondanceState}
                onChange={handleChange("correspondanceState")}
                required
              />
            </FormControl>

            <FormControl id="correspondanceVillage">
              <FormLabel>Enter your correspondance Village</FormLabel>
              <Input
                type="text"
                placeholder="Enter your correspondance Village"
                value={formData.correspondanceVillage}
                onChange={handleChange("correspondanceVillage")}
                required
              />
            </FormControl>

            <FormControl id="correspondancePincode">
              <FormLabel>Enter your correspondance Pin code</FormLabel>
              <Input
                type="text"
                placeholder="Enter your correspondance Pin code"
                value={formData.correspondancePincode}
                onChange={handleChange("correspondancePincode")}
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

export default FormTwo;
