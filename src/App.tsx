import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ChatsList from './components/chats-list/ChatsList';
import ChatInput from './components/main-chat/ChatInput';
import MainChat from './components/main-chat/MainChat';
import { useTypedSelector } from './hooks/useTypedSelector';
import { addUser, removeUser, updateChat } from './store/actions/ChatActions';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;
const ChatContainer = styled.div`
  flex-grow: 1;
`;

function App() {
  const dispatch = useDispatch();
  const username = useTypedSelector((state) => state.chat.user);

  useEffect(() => {
    dispatch(addUser(username));

    const storageChangeHandler = (e: any) => {
      const newValue = e.newValue;
      dispatch(updateChat(e.key!, newValue ? JSON.parse(newValue) : []));
    };
    const removeUsernameHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      dispatch(removeUser(username));
    };

    window.addEventListener('storage', storageChangeHandler);
    window.addEventListener('beforeunload', removeUsernameHandler);

    return () => {
      window.removeEventListener('storage', storageChangeHandler);
      window.removeEventListener('beforeunload', removeUsernameHandler);
    };
  }, [dispatch, username]);

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
