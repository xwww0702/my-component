import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3-vite";
import { fn, within, userEvent, expect } from "@storybook/test";
import type { PlayFunction } from "@storybook/types";
import type { VueRenderer } from "@storybook/vue3-vite";
import { MyButton, MyButtonGroup } from "@qiwen72/my-component";

import "@qiwen72/my-component/dist/theme/Button.css"; // Import the CSS for the button component
const playFn: PlayFunction<VueRenderer> = async ({
  canvasElement,
  args,
  step,
}) => {
  const canvas = within(canvasElement);
  await step("click btn", async () => {
    await userEvent.tripleClick(canvas.getByRole("button"));
  });
  expect(args.onClick).toHaveBeenCalled();
};

const playGroup: PlayFunction<VueRenderer> = async ({
  canvasElement,
  args,
  step,
}) => {
  const canvas = within(canvasElement);
  await step("click btn1", async () => {
    await userEvent.click(canvas.getByText("Button1"));
  });
  await step("click btn2", async () => {
    await userEvent.click(canvas.getByText("Button2"));
  });
  expect(args.onClick).toHaveBeenCalled();
};

type Story = StoryObj<typeof MyButton> & { argTypes?: ArgTypes };

const meta: Meta<typeof MyButton> = {
  title: "Example/Button",
  component: MyButton,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    size: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    useThrottle: {
      control: "boolean",
    },
    throttleDuration: {
      control: "number",
    },
    autofocus: {
      control: "boolean",
    },
    tag: {
      control: { type: "select" },
      options: ["button", "a", "div"],
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset", ""],
    },
    icon: {
      control: { type: "text" },
    },
    loadingIcon: {
      control: { type: "text" },
    },
  },
  args: { onClick: fn() },
};
const container = (val: string) => `
<div style="margin:5px">
 ${val}
 </div>
`;

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  args: {
    type: "primary",
    content: "Button",
  },
  render: (args: any) => ({
    components: { MyButton },
    setup() {
      return { args };
    },
    template: container(
      `<my-button v-bind="args">{{args.content}}</my-button>`
    ),
  }),

  play: playFn,
};

export const Circle: Story = {
  args: {
    icon: "search",
  },
  render: (args: any) => ({
    components: { MyButton },
    setup() {
      return { args };
    },
    template: container(`
      <my-button circle v-bind="args"/>
    `),
  }),
  play: playFn,
};

export const Group: Story & { args: { content1: string; content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    groupSize: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    groupDisabled: {
      control: "boolean",
    },
    content1: {
      control: { type: "text" },
      defaultValue: "Button1",
    },
    content2: {
      control: { type: "text" },
      defaultValue: "Button2",
    },
  },
  args: {
    round: true,
    content1: "Button1",
    content2: "Button2",
  },
  render: (args: any) => ({
    components: { MyButton, MyButtonGroup },
    setup() {
      return { args };
    },
    template: container(`
       <my-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
         <my-button v-bind="args">{{args.content1}}</my-button>
         <my-button v-bind="args">{{args.content2}}</my-button>
       </my-button-group>
    `),
  }),
  play: playGroup,
};

export default meta;
