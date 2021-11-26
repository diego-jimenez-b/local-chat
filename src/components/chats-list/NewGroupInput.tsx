import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createNewGroup } from '../../store/actions/ChatActions';

import styled from 'styled-components';
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

const NewGroupInput = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const addGroupHandler = () => {
    const input = inputRef.current?.value || '';
    if (input.trim() === '') return;

    dispatch(createNewGroup(input));
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Input ref={inputRef} type='text' placeholder='enter a new group name' />
      <Button onClick={addGroupHandler}>Add</Button>
    </Modal>
  );
};

export default NewGroupInput;
