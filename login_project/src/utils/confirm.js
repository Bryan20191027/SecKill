import { MessageBox, Message } from "element-ui";

export function handleConfirm(text = "确定执行此操作吗？", type = "danger") {
  return MessageBox.confirm(text, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: type
  });
}

export function handleAlert(text = "操作成功", type = "success") {
  return Message({
    showClose: true,
    message: text,
    type: type
  });
}
