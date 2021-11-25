import styled from 'styled-components';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const StyledChatsList = styled.div`
  background-color: #670d7e;
  color: white;
  width: 350px;
  font-weight: bold;

  & > h1 {
    display: block;
    margin: 30px 0;
    padding: 0 5px;
    font-size: 20px;
  }
`;
const ChatsSection = styled.div`
  border-top: 2px solid white;
  margin-bottom: 0;
  padding: 15px 5px;

  h2 {
    font-size: 16px;
    margin: 0;
  }
  & > span {
    font-size: 12px;
  }
`;
const Button = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 20px;
  margin-top: 10px;
  padding: 6px 12px;
  display: block;
  font-weight: bold;

  &:hover {
    background-color: #202020;
    cursor: pointer;
  }
`;

const ChatsList = () => {
  const { user, chatGroups, privateChats, onlineUsers } = useTypedSelector(
    (state) => state.chat
  );

  return (
    <StyledChatsList>
      <h1>name: {user}</h1>

      <ChatsSection>
        <h2>Public</h2>
      </ChatsSection>

      <ChatsSection>
        <h2>Groups</h2>
        {chatGroups.length > 0 && (
          <h3>{chatGroups.map((group) => group.name)}</h3>
        )}
        {chatGroups.length === 0 && <span>No groups created yet...</span>}
        <Button>+ create new group</Button>
      </ChatsSection>

      <ChatsSection>
        <h2>Private chats</h2>
        {privateChats.length > 0 && (
          <h3>{chatGroups.map((group) => group.name)}</h3>
        )}
        {privateChats.length === 0 && (
          <span>No private conversations found</span>
        )}
      </ChatsSection>

      <ChatsSection>
        <h2>Online users:</h2>
        {onlineUsers.length > 0 && (
          <ul>
            {onlineUsers.map((user) => (
              <li>{user}</li>
            ))}
          </ul>
        )}
        {onlineUsers.length === 0 && <span>No other user online</span>}
      </ChatsSection>
    </StyledChatsList>
  );
};

export default ChatsList;
