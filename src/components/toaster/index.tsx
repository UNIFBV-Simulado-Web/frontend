import React from "react";
import { X, CheckCircle, XCircle, Info } from "lucide-react";
import { ToastType, useToasterStore } from "@/store/toasterStore";
import {
  CloseButton,
  IconWrapper,
  MessageWrapper,
  ToasterContainer,
  ToastWrapper,
} from "./styles";

export const Toaster = () => {
  const { toasts, removeToast } = useToasterStore();

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} />;
      case "error":
        return <XCircle size={20} />;
      case "info":
        return <Info size={20} />;
      default:
        return null;
    }
  };

  return (
    <ToasterContainer>
      {toasts.map((toast) => (
        <ToastWrapper key={toast.id} type={toast.type}>
          <IconWrapper type={toast.type}>{getIcon(toast.type)}</IconWrapper>
          <MessageWrapper>{toast.message}</MessageWrapper>
          <CloseButton onClick={() => removeToast(toast.id)}>
            <X size={18} />
          </CloseButton>
        </ToastWrapper>
      ))}
    </ToasterContainer>
  );
};
