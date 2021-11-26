import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, removeUser, updateChat } from './store/actions/ChatActions';

import styled from 'styled-components';
import ChatsList from './components/chats-list/ChatsList';
import ChatInput from './components/main-chat/ChatInput';
import MainChat from './components/main-chat/MainChat';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;
const ChatContainer = styled.div`
  flex-grow: 1;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addUser());

    const storageChangeHandler = (e: any) => {
      const newValue = e.newValue;
      dispatch(updateChat(e.key!, newValue ? JSON.parse(newValue) : []));
    };
    const removeUsernameHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      dispatch(removeUser());
    };

    window.addEventListener('storage', storageChangeHandler);
    window.addEventListener('beforeunload', removeUsernameHandler);

    return () => {
      window.removeEventListener('storage', storageChangeHandler);
      window.removeEventListener('beforeunload', removeUsernameHandler);
    };
  }, [dispatch]);

  return (
    <LayoutContainer>
      <ChatsList />

      <ChatContainer>
        <MainChat />
        <ChatInput />
      </ChatContainer>
    </LayoutContainer>
  );
}

export default App;
