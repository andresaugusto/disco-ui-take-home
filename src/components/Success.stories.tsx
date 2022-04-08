import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Typography } from "@mui/material";

import { Success } from "./Success";
import { EXAMPLE_CREDENTIAL } from "../utils/";

export default {
  title: "Disco Elements",
  component: Success,
} as ComponentMeta<typeof Success>;

const Template: ComponentStory<typeof Success> = (args) => {
  return <Success cred={EXAMPLE_CREDENTIAL} />;
}

export const success = Template.bind({});
