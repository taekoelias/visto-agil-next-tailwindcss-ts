import { toast } from "react-toastify"

const Success = (text: string) => {
  toast.success(text)
}

const Info = (text: string) => {
  toast.info(text)
}

const Warning = (text: string) => {
  toast.warn(text)
}

const Error = (text: string) => {
  toast.error(text)
}

export const Notification = {
  Success,Info,Warning,Error
}