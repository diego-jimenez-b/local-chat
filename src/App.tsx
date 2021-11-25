import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ChatsList from './components/chats-list/ChatsList';
import ChatInput from './components/main-chat/ChatInput';
import MainChat from './components/main-chat/MainChat';
import { updateChat } from './store/actions/ChatActions';

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
    const storageChangeHandler = (e: any) => {
      // console.log(JSON.parse(e.newValue || ''), e);
      const newValue = e.newValue;
      dispatch(updateChat(e.key!, newValue ? JSON.parse(newValue) : []));
    };

    window.addEventListener('storage', storageChangeHandler);

    return () => {
      window.removeEventListener('storage', storageChangeHandler);
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
