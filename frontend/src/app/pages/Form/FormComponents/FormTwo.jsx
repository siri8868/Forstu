import { Button } from "@chakra-ui/react";
import React, { useContext } from "react";
import { formContext } from "../FormDashboard";

function FormTwo() {
  const { formState, setFormState } = useContext(formContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    setFormState({ ...formState, currentTabIndex: 0 });
  };

  const handlePrev = () => {
    setFormState({ ...formState, currentTabIndex: 0 });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Button
          color="text.light"
          type="submit"
          bg="primary.main"
          variant={"outline"}
        >
          Submit
        </Button>
      </form>

      <Button mx={2} onClick={handlePrev} type="button" variant={"outline"}>
        submit
      </Button>
      <Button mx={2} onClick={handlePrev} type="button" variant={"outline"}>
        previous
      </Button>
    </div>
  );
}

export default FormTwo;
