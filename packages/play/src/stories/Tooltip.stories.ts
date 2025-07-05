import type { StoryObj, Meta } from "@storybook/vue3-vite";

import { fn } from "@storybook/test";
import { MyTooltip } from "@qiwen72/my-component";
import "@qiwen72/my-component/dist/theme/Tooltip.css";

type Story = StoryObj<typeof MyTooltip>;

const meta: Meta<typeof MyTooltip> = {
  title: "Example/Tooltip",
  component: MyTooltip,
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      options: ["hover", "click", "contextmenu"],
      control: {
        type: "select",
      },
    },
    placement: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    "onVisible-change": fn(),
  },
};

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    placement: "top",
    trigger: "hover",
  },
  render: (args: any) => ({
    components: { MyTooltip },
    setup() {
      return {
        args,
      };
    },
    template: `
      <MyTooltip v-bind="args">
          <div style="height:30px;width:200px;background:red;padding:auto">trigger</div>
      </MyTooltip>
    `,
  }),
};

export default meta;
