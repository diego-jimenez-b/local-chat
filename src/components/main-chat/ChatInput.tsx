import { FormEventHandler, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { sendMessage } from '../../store/actions/ChatActions';

const Form = styled.form`
  background-color: #dddddd;
  height: 20%;
  text-align: center;
  position: relative;
`;
const Input = styled.textarea`
  border: 2px solid black;
  border-radius: 20px;
  width: 80%;
  margin-top: 26px;
  padding: 10px;
  resize: none;

  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  background-color: purple;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 8px 35px;
  font-weight: bold;
  font-size: 15px;
  position: absolute;
  top: 88px;
  right: 10%;
  cursor: pointer;

  &:hover {
    background-color: #970097;
  }
`;
const ChatName = styled.span`
  position: absolute;
  top: -30px;
  left: 10px;
  font-weight: bold;
  z-index: 5;
`;

const ChatInput = () => {
  const {
    user,
    currentChatName: chatName,
    currentChat,
  } = useTypedSelector((state) => state.chat);
  const dispatch = useDispatch();
  const userInputRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler: FormEventHandler = (e) => {
    e.preventDefault();
    const input = userInputRef.current?.value;

    if (!input || input.trim().length === 0) {
      alert('message must not be empty');
      return;
    }

    const timestamp = new Date();
    dispatch(
      sendMessage(
        {
          id: timestamp.getTime() + user,
          author: user,
          date: timestamp.toLocaleTimeString(),
          text: input,
        },
        undefined,
        chatName
      )
    );
    userInputRef.current.value = '';
  };

  return (
    <Form onSubmit={submitFormHandler}>
      <Input ref={userInputRef} placeholder='Send a message' />
      <Button type='submit'>Send</Button>

      <ChatName>
        {currentChat}
        {chatName ? `: ${chatName}` : ''}
      </ChatName>
    </Form>
  );
};

export default ChatInput;
