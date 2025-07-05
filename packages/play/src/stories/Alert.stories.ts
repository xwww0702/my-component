import type { StoryObj, Meta, ArgTypes } from "@storybook/vue3-vite";
import { ref, watch } from "vue";
import { fn } from "@storybook/test";
import { MyAlert, type AlertInstance } from "@qiwen72/my-component";
import "@qiwen72/my-component/dist/theme/Alert.css";

type Story = StoryObj<typeof MyAlert> & { argTypes?: ArgTypes };

const meta: Meta<typeof MyAlert> = {
  title: "Example/Alert",
  component: MyAlert,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "warning", "info", "danger"],
    },
    effect: {
      control: "select",
      options: ["light", "dark"],
    },
    center: {
      control: "boolean",
    },
  },
  args: {
    onClose: fn(),
  },
};

export const Default: Story & { args: { visible: boolean } } = {
  args: {
    title: "标题",
    description: "这是一段描述",
    type: "success",
    effect: "light",
    closable: true,
    showIcon: true,
    visible: true,
  },
  render: (args) => ({
    components: { MyAlert },
    setup() {
      const alertRef = ref<AlertInstance>();
      watch(
        () => (args as any).visible,
        (val: boolean) => {
          if (val) {
            alertRef.value?.open();
          } else {
            alertRef.value?.close();
          }
        }
      );
      return { args, alertRef };
    },
    template: `
     <my-alert ref="alertRef" v-bind="args"></my-alert>
    `,
  }),
};

export default meta;
