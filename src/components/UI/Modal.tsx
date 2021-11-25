import { Fragment, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.555);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;
const ModalOverlay = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
`;

interface ModalPropsType {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalPropsType) => {
  return (
    <Fragment>
      {createPortal(
        <Backdrop onClick={onClose} />,
        document.getElementById('overlays')!
      )}
      {createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById('overlays')!
      )}
    </Fragment>
  );
};

export default Modal;
