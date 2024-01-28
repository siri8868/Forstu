import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
  getPersonalInfoApi,
  submitFormDataApi,
} from "../../../api/FormApi/FormApi";
import { getOTPSecret } from "../../../helpers/AuthHelpers";

function FormOne() {
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
      candidateName: formData.candidateName,
      email: formData.email,
      whatsappNumber: formData.whatsappNumber,
      dob: formData.dob,
      gender: formData.gender,
      parentMobileNumber: formData.parentMobileNumber,
      maritalStatus: formData.maritalStatus,
      religion: formData.religion,
      casteCategory: formData.casteCategory,
      subCaste: formData.subCaste,
      doYouHaveCasteCertificate: formData.doYouHaveCasteCertificate,
      casteCertificateNumber: formData.casteCertificateNumber,
      casteIssuedDistrict: formData.casteIssuedDistrict,
      casteApplicantName: formData.casteApplicantName,
      casteIssuingAuthority: formData.casteIssuingAuthority,
      casteDoc: formData.casteDoc,
      casteIssuedDate: formData.casteIssuedDate,
      annualFamilyIncome: formData.annualFamilyIncome,
      doYouHaveIncomeCertificate: formData.doYouHaveIncomeCertificate,
      incomeCertNo: formData.incomeCertNo,
      incomeIssAuthority: formData.incomeIssAuthority,
      incomeDoc: formData.incomeDoc,
      incomeIssuedDate: formData.incomeIssuedDate,
      doYouHaveDomicileMaharashtraKarnataka:
        formData.doYouHaveDomicileMaharashtraKarnataka,
      doYouHaveDomicileCertificate: formData.doYouHaveDomicileCertificate,
      domicileRelationType: formData.domicileRelationType,
      domicilecertnumber: formData.domicileCertNumber,
      domicileApplicantName: formData.domicileApplicantName,
      domicileIssuedAuthority: formData.domicileIssuedAuthority,
      domicileDoc: formData.domicileDoc,
      domicileIssuedDate: formData.domicileIssuedDate,
      doYouHaveDisability: formData.doYouHaveDisability,
      disabilityType: formData.disabilityType,
      disabilityName: formData.disabilityName,
      doYouHaveDisabilityCertificate: formData.doYouHaveDisabilityCertificate,
      disabilityCertificateNo: formData.disabilityCertificateNo,
      disabilityPercentage: formData.disabilityPercentage,
      disabilityIssuedDate: formData.disabilityIssuedDate,
      disabilityIssuingAuthority: formData.disabilityIssuingAuthority,
      disabilityDoc: formData.disabilityDoc,
      bankaccName: formData.bankaccName,
      bankIfsc: formData.bankIfsc,
    };

    console.log("data", data);

    submitFormDataApi(data)
      .then((res) => {
        if (res.success) {
          // onClose();
          // getAllColleges();
          toast({
            title: "PersonalInfo Details Updated.",
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

  const getPersonalInfo = () => {
    const studentMail = getOTPSecret().to;
    const data = {
      email: studentMail,
    };
    getPersonalInfoApi(data)
      .then((res) => {
        console.log("res", res.data[0]);
        setFormData(res.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getPersonalInfo();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <ModalBody> */}
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
            <FormControl id="candidateName">
              <FormLabel>candidate Name (As Per SSC Marksheet)</FormLabel>
              <Input
                type="text"
                placeholder="Enter your candidateName"
                value={formData.candidateName}
                onChange={handleChange("candidateName")}
                required
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel>email</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange("email")}
                required
              />
            </FormControl>

            <FormControl id="whatsappNumber">
              <FormLabel>Mobile (Student WhatsApp Number)</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange("whatsappNumber")}
                required
              />
            </FormControl>

            <FormControl id="dob">
              <FormLabel>Date of Birth (as per Aadhar)</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your dob"
                value={formData.dob}
                onChange={handleChange("dob")}
                required
              />
            </FormControl>

            <FormControl id="gender">
              <FormLabel>Gender</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your gender"
                value={formData.gender}
                onChange={handleChange("gender")}
                required
              />
            </FormControl>

            <FormControl id="parentMobileNumber">
              <FormLabel>Parent's/Guardian Mobile No</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your parentMobileNumber"
                value={formData.parentMobileNumber}
                onChange={handleChange("parentMobileNumber")}
                required
              />
            </FormControl>

            <FormControl id="maritalStatus">
              <FormLabel>Marital Status</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange("maritalStatus")}
                required
              />
            </FormControl>

            <FormControl id="religion">
              <FormLabel>Religion</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your religion"
                value={formData.religion}
                onChange={handleChange("religion")}
                required
              />
            </FormControl>

            <FormControl id="casteCategory">
              <FormLabel>Caste Category</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your casteCategory"
                value={formData.casteCategory}
                onChange={handleChange("casteCategory")}
                required
              />
            </FormControl>

            <FormControl id="subCaste">
              <FormLabel>Sub Caste</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your subCaste"
                value={formData.subCaste}
                onChange={handleChange("subCaste")}
                required
              />
            </FormControl>

            <FormControl id="doYouHaveCasteCertificate">
              <FormLabel>Do you have Caste Certificate?</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your doYouHaveCasteCertificate"
                value={formData.doYouHaveCasteCertificate}
                onChange={handleChange("doYouHaveCasteCertificate")}
                required
              />
            </FormControl>

            <FormControl id="casteCertificateNumber">
              <FormLabel>Caste Certificate Number</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your casteCertificateNumber"
                value={formData.casteCertificateNumber}
                onChange={handleChange("casteCertificateNumber")}
                required
              />
            </FormControl>

            <FormControl id="casteIssuedDistrict">
              <FormLabel>Issuing District (Caste Certificate)</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your casteIssuedDistrict"
                value={formData.casteIssuedDistrict}
                onChange={handleChange("casteIssuedDistrict")}
                required
              />
            </FormControl>

            <FormControl id="casteApplicantName">
              <FormLabel> Caste Applicant Name</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your casteApplicantName"
                value={formData.casteApplicantName}
                onChange={handleChange("casteApplicantName")}
                required
              />
            </FormControl>

            <FormControl id="casteIssuingAuthority">
              <FormLabel> Caste Issuing Authority</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your Caste Issuing Authority"
                value={formData.casteIssuingAuthority}
                onChange={handleChange("casteIssuingAuthority")}
                required
              />
            </FormControl>

            <FormControl id="casteDoc">
              <FormLabel> Caste Docs</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your Caste Docs"
                value={formData.casteDoc}
                onChange={handleChange("casteDoc")}
                required
              />
            </FormControl>

            <FormControl id="casteIssuedDate">
              <FormLabel> Caste Issuing Date</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your Caste Issuing Date"
                value={formData.casteIssuedDate}
                onChange={handleChange("casteIssuedDate")}
                required
              />
            </FormControl>

            <FormControl id="annualFamilyIncome">
              <FormLabel>Family Annual Income</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your Family Annual Income"
                value={formData.annualFamilyIncome}
                onChange={handleChange("annualFamilyIncome")}
                required
              />
            </FormControl>

            <FormControl id="doYouHaveIncomeCertificate">
              <FormLabel>Do you have Income Certificate?</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your doYouHaveIncomeCertificate"
                value={formData.doYouHaveIncomeCertificate}
                onChange={handleChange("doYouHaveIncomeCertificate")}
                required
              />
            </FormControl>

            <FormControl id="incomeCertNo">
              <FormLabel>Income Certificate Number</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your incomeCertNo"
                value={formData.incomeCertNo}
                onChange={handleChange("incomeCertNo")}
                required
              />
            </FormControl>

            <FormControl id="incomeIssAuthority">
              <FormLabel>Income Certificate Issuing Authority</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your Income Issuing Authority"
                value={formData.incomeIssAuthority}
                onChange={handleChange("incomeIssAuthority")}
                required
              />
            </FormControl>

            <FormControl id="incomeDoc">
              <FormLabel>Income Certificate Doc</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your Income income Doc"
                value={formData.incomeDoc}
                onChange={handleChange("incomeDoc")}
                required
              />
            </FormControl>

            <FormControl id="incomeIssuedDate">
              <FormLabel>Income Certificate Issuing date</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Enter your Income Date of Issue"
                value={formData.incomeIssuedDate}
                onChange={handleChange("incomeIssuedDate")}
                required
              />
            </FormControl>

            <FormControl id="doYouHaveDomicileMaharashtraKarnataka">
              <FormLabel>
                Are you Domicile of Maharashtra / Maharashtra-Karnataka Border ?
              </FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Are you Domicile of Maharashtra / Maharashtra-Karnataka Border ?"
                value={formData.doYouHaveDomicileMaharashtraKarnataka}
                onChange={handleChange("doYouHaveDomicileMaharashtraKarnataka")}
                required
              />
            </FormControl>

            <FormControl id="doYouHaveDomicileCertificate">
              <FormLabel>Do you have Domicile Certificate ?</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Do you have Domicile Certificate ?"
                value={formData.doYouHaveDomicileCertificate}
                onChange={handleChange("doYouHaveDomicileCertificate")}
                required
              />
            </FormControl>

            <FormControl id="domicileRelationType">
              <FormLabel>Relationship Type (Domicile)</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Relationship Type"
                value={formData.domicileRelationType}
                onChange={handleChange("domicileRelationType")}
                required
              />
            </FormControl>

            <FormControl id="domicileCertNumber">
              <FormLabel>Domicile Certificate No</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Domicile Certificate No"
                value={formData.domicileCertNumber}
                onChange={handleChange("domicileCertNumber")}
                required
              />
            </FormControl>

            <FormControl id="domicileApplicantName">
              <FormLabel>Domicile Applicant Name</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Domicile Applicant Name"
                value={formData.domicileApplicantName}
                onChange={handleChange("domicileApplicantName")}
                required
              />
            </FormControl>

            <FormControl id="domicileIssuedAuthority">
              <FormLabel>Domicile Issuing Authority</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Domicile Issuing Authority"
                value={formData.domicileIssuedAuthority}
                onChange={handleChange("domicileIssuedAuthority")}
                required
              />
            </FormControl>

            <FormControl id="domicileDoc">
              <FormLabel>Domicile Doc</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Domicile Doc"
                value={formData.domicileDoc}
                onChange={handleChange("domicileDoc")}
                required
              />
            </FormControl>

            <FormControl id="domicileIssuedDate">
              <FormLabel>Domicile Issued Date</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Domicile Issued Date"
                value={formData.domicileIssuedDate}
                onChange={handleChange("domicileIssuedDate")}
                required
              />
            </FormControl>

            <FormControl id="doYouHaveDisability">
              <FormLabel>Do You Have Any Disability</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Disability of any Type?"
                value={formData.doYouHaveDisability}
                onChange={handleChange("doYouHaveDisability")}
                required
              />
            </FormControl>

            <FormControl id="disabilityType">
              <FormLabel>Disability Type</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Disability Type"
                value={formData.disabilityType}
                onChange={handleChange("disabilityType")}
                required
              />
            </FormControl>

            <FormControl id="disabilityName">
              <FormLabel>Person with Disability</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Person with Disability"
                value={formData.disabilityName}
                onChange={handleChange("disabilityName")}
                required
              />
            </FormControl>

            <FormControl id="doYouHaveDisabilityCertificate">
              <FormLabel>Do you have Disability Certificate ?</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Do you have Disability Certificate ?"
                value={formData.doYouHaveDisabilityCertificate}
                onChange={handleChange("doYouHaveDisabilityCertificate")}
                required
              />
            </FormControl>

            <FormControl id="disabilityCertificateNo">
              <FormLabel>Disability Certificate Number ?</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Disability Certificate Number ?"
                value={formData.disabilityCertificateNo}
                onChange={handleChange("disabilityCertificateNo")}
                required
              />
            </FormControl>

            <FormControl id="disabilityPercentage">
              <FormLabel>
                Disability Percentage (Should not less than 40%)
              </FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Disability Percentage (Should not less than 40%)"
                value={formData.disabilityPercentage}
                onChange={handleChange("disabilityPercentage")}
                required
              />
            </FormControl>

            <FormControl id="disabilityIssuedDate">
              <FormLabel>Disability Issuing Date</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Disability Issuing Date"
                value={formData.disabilityIssuedDate}
                onChange={handleChange("disabilityIssuedDate")}
                required
              />
            </FormControl>

            <FormControl id="disabilityIssuingAuthority">
              <FormLabel>Disability Issuing Authority</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Disability Issuing Authority"
                value={formData.disabilityIssuingAuthority}
                onChange={handleChange("disabilityIssuingAuthority")}
                required
              />
            </FormControl>

            <FormControl id="disabilityDoc">
              <FormLabel>Disability Document</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Disability Document"
                value={formData.disabilityDoc}
                onChange={handleChange("disabilityDoc")}
                required
              />
            </FormControl>

            <FormControl id="bankaccName">
              <FormLabel>Bank Account Number</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Bank Account Number"
                value={formData.bankaccName}
                onChange={handleChange("bankaccName")}
                required
              />
            </FormControl>

            <FormControl id="bankIfsc">
              <FormLabel>Bank IFSC Code</FormLabel>
              <Input
                // isDisabled={true}
                type="text"
                placeholder="Bank IFSC Code"
                value={formData.bankIfsc}
                onChange={handleChange("bankIfsc")}
                required
              />
            </FormControl>

            {/* <FormControl id="admissionApplicationId">
              <FormLabel>admissionApplicationId</FormLabel>
              <Input
                isDisabled={true}
                type="text"
                placeholder="Enter your admissionApplicationId"
                value={formData.admissionApplicationId}
                onChange={handleChange("admissionApplicationId")}
                required
              />
            </FormControl>

            <FormControl id="admissionCategory">
              <FormLabel>admissionCategory</FormLabel>
              <Input
                type="text"
                placeholder="Enter your admissionCategory"
                value={formData.admissionCategory}
                onChange={handleChange("admissionCategory")}
                required
              />
            </FormControl>

            <FormControl id="admissionDate">
              <FormLabel>admissionDate</FormLabel>
              <Input
                type="text"
                placeholder="Enter your admissionDate"
                value={formData.admissionDate}
                onChange={handleChange("admissionDate")}
                required
              />
            </FormControl>

            <FormControl id="admissionType">
              <FormLabel>admissionType</FormLabel>
              <Input
                type="text"
                placeholder="Enter your admissionType"
                value={formData.admissionType}
                onChange={handleChange("admissionType")}
                required
              />
            </FormControl>

            <FormControl id="admissionYear">
              <FormLabel>admissionYear</FormLabel>
              <Input
                type="text"
                placeholder="Enter your admissionYear"
                value={formData.admissionYear}
                onChange={handleChange("admissionYear")}
                required
              />
            </FormControl>

            <FormControl id="alternateMobileNumber">
              <FormLabel>alternateMobileNumber</FormLabel>
              <Input
                type="text"
                placeholder="Enter your alternateMobileNumber"
                value={formData.alternateMobileNumber}
                onChange={handleChange("alternateMobileNumber")}
                required
              />
            </FormControl>

            <FormControl id="annualFamilyIncome">
              <FormLabel>annualFamilyIncome</FormLabel>
              <Input
                type="text"
                placeholder="Enter your annualFamilyIncome"
                value={formData.annualFamilyIncome}
                onChange={handleChange("annualFamilyIncome")}
                required
              />
            </FormControl>

            {formData.applicationFailedReason != null ? (
              <FormControl id="applicationFailedReason">
                <FormLabel>applicationFailedReason</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your applicationFailedReason"
                  value={formData.applicationFailedReason}
                  onChange={handleChange("applicationFailedReason")}
                  required
                />
              </FormControl>
            ) : //   <FormControl id="applicationFailedReason">
            //     <FormLabel>applicationFailedReason</FormLabel>
            //     <Input
            //       isDisabled={true}
            //       type="text"
            //       placeholder="Enter your applicationFailedReason"
            //       value={formData.applicationFailedReason}
            //       onChange={handleChange("applicationFailedReason")}
            //       required
            //     />
            //   </FormControl>
            null}

            <FormControl id="applicationStatus">
              <FormLabel>applicationStatus</FormLabel>
              <Input
                type="text"
                placeholder="Enter your applicationStatus"
                value={formData.applicationStatus}
                onChange={handleChange("applicationStatus")}
                required
              />
            </FormControl>

            <FormControl id="applicationSubmissionDate">
              <FormLabel>applicationSubmissionDate</FormLabel>
              <Input
                type="text"
                placeholder="Enter your applicationSubmissionDate"
                value={formData.applicationSubmissionDate}
                onChange={handleChange("applicationSubmissionDate")}
                required
              />
            </FormControl>

            <FormControl id="areYouHostellerDayScholar">
              <FormLabel>areYouHostellerDayScholar</FormLabel>
              <Input
                type="text"
                placeholder="Enter your areYouHostellerDayScholar"
                value={formData.areYouHostellerDayScholar}
                onChange={handleChange("areYouHostellerDayScholar")}
                required
              />
            </FormControl>

            <FormControl id="bankIfsc">
              <FormLabel>bankIfsc</FormLabel>
              <Input
                type="text"
                placeholder="Enter your bankIfsc"
                value={formData.bankIfsc}
                onChange={handleChange("bankIfsc")}
                required
              />
            </FormControl>

            <FormControl id="bankaccName">
              <FormLabel>bankaccName</FormLabel>
              <Input
                type="text"
                placeholder="Enter your bankaccName"
                value={formData.bankaccName}
                onChange={handleChange("bankaccName")}
                required
              />
            </FormControl>

            <FormControl id="candidateEligible">
              <FormLabel>candidateEligible</FormLabel>
              <Input
                type="text"
                placeholder="Enter your candidateEligible"
                value={formData.candidateEligible}
                onChange={handleChange("candidateEligible")}
                required
              />
            </FormControl>

            <FormControl id="casteApplicantName">
              <FormLabel>casteApplicantName</FormLabel>
              <Input
                type="text"
                placeholder="Enter your casteApplicantName"
                value={formData.casteApplicantName}
                onChange={handleChange("casteApplicantName")}
                required
              />
            </FormControl>

            <FormControl id="casteCategory">
              <FormLabel>casteCategory</FormLabel>
              <Input
                type="text"
                placeholder="Enter your casteCategory"
                value={formData.casteCategory}
                onChange={handleChange("casteCategory")}
                required
              />
            </FormControl>

            <FormControl id="casteCertificateNumber">
              <FormLabel>casteCertificateNumber</FormLabel>
              <Input
                type="text"
                placeholder="Enter your casteCertificateNumber"
                value={formData.casteCertificateNumber}
                onChange={handleChange("casteCertificateNumber")}
                required
              />
            </FormControl>

            <FormControl id="casteDoc">
              <FormLabel>casteDoc</FormLabel>
              <Input
                type="text"
                placeholder="Enter your casteDoc"
                value={formData.casteDoc}
                onChange={handleChange("casteDoc")}
                required
              />
            </FormControl>

            <FormControl id="casteIssuedDate">
              <FormLabel>casteIssuedDate</FormLabel>
              <Input
                type="text"
                placeholder="Enter your casteIssuedDate"
                value={formData.casteIssuedDate}
                onChange={handleChange("casteIssuedDate")}
                required
              />
            </FormControl> */}
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

        {/* <Button mx={2} onClick={handlePrev} type="button" variant={"outline"}>
          previous
        </Button> */}
        {/* </ModalFooter> */}
      </form>
    </div>
  );
}

export default FormOne;
