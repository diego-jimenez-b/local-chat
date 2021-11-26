import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import {
  changeUsername,
  createNewGroup,
} from '../../store/actions/ChatActions';
import Modal from '../UI/Modal';

const Input = styled.input`
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 20px;
`;
const Button = styled.button`
  background-color: #ac0000;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px 20px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: #c40000;
  }
`;

interface ModalInputProps {
  onClose: () => void;
  placeholder: string;
  btnText: string;
  changeType: 'NAME' | 'GROUP';
}

const ModalInput = ({
  onClose,
  changeType,
  placeholder,
  btnText,
}: ModalInputProps) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const addGroupHandler = () => {
    const input = inputRef.current?.value || '';
    if (input.trim() === '') return;

    if (changeType === 'GROUP') dispatch(createNewGroup(input));
    if (changeType === 'NAME') dispatch(changeUsername(input));

    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Input ref={inputRef} type='text' placeholder={placeholder} />
      <Button onClick={addGroupHandler}>{btnText}</Button>
    </Modal>
  );
};

export default ModalInput;
