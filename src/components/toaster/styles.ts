import { ToastType } from "@/store/toasterStore";
import styled, { keyframes } from "styled-components";

export const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export const ToasterContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ToastWrapper = styled.div<{ type: ToastType }>`
  min-width: 300px;
  max-width: 400px;
  background-color: #2d3748;
  color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  animation: ${slideIn} 0.5s forwards;
  border-left: 5px solid
    ${({ type }) => {
      if (type === "success") return "#48bb78";
      if (type === "error") return "#f56565";
      return "#4299e1";
    }};
`;

export const IconWrapper = styled.div<{ type: ToastType }>`
  flex-shrink: 0;
  margin-right: 0.75rem;
  color: ${({ type }) => {
    if (type === "success") return "#48bb78";
    if (type === "error") return "#f56565";
    return "#4299e1";
  }};
`;

export const MessageWrapper = styled.div`
  flex-grow: 1;
  font-size: 0.9rem;
`;

export const CloseButton = styled.button`
  background: none;f
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
  line-height: 1;

  &:hover {
    color: white;
  }
`;
