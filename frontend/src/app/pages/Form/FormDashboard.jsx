import React, { createContext, useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import FormOne from "./FormComponents/FormOne";
import FormTwo from "./FormComponents/FormTwo";
import { getIncompleteFieldsApi } from "../../api/FormApi/FormApi";
export const formContext = createContext();

function FormDashboard() {
  const [formState, setFormState] = useState({
    currentTabIndex: 0,
  });

  const [formDataMain, setFormDataMain] = useState({});

  const getIncompleteFields = () => {
    const data = {
      email: "nishant@gmail.com",
    };
    getIncompleteFieldsApi(data)
      .then((res) => {
        // console.log("res", res);
        // setData(res.incompleteFields);
        setFormDataMain(res.incompleteFields[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // setFormData(collage);
    getIncompleteFields();
  }, []);

  return (
    <>
      {/* <FormOne /> */}

      <formContext.Provider value={{ formState, setFormState }}>
        <Tabs index={formState.currentTabIndex} isLazy>
          <TabList>
            <Tab
              onClick={() => setFormState({ ...formState, currentTabIndex: 0 })}
            >
              Personal Information
            </Tab>
            <Tab
              onClick={() => setFormState({ ...formState, currentTabIndex: 1 })}
            >
              Address Information
            </Tab>
            <Tab
              onClick={() => setFormState({ ...formState, currentTabIndex: 2 })}
            >
              Other Information
            </Tab>
            <Tab
              onClick={() => setFormState({ ...formState, currentTabIndex: 3 })}
            >
              Current Course
            </Tab>

            <Tab
              onClick={() => setFormState({ ...formState, currentTabIndex: 4 })}
            >
              Past Qualification
            </Tab>
            <Tab
              onClick={() => setFormState({ ...formState, currentTabIndex: 5 })}
            >
              Hostel Details
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <FormOne formDataMain={formDataMain} />
            </TabPanel>
            <TabPanel>
              <FormTwo />
            </TabPanel>
            <TabPanel>{/* <FormThree /> */}</TabPanel>
          </TabPanels>
        </Tabs>
      </formContext.Provider>
    </>
  );
}

export default FormDashboard;
