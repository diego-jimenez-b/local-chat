import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { changeChat, ExistingChatTypes } from '../../store/actions/ChatActions';
import NewGroupInput from './NewGroupInput';

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
const ChatGroup = styled.ul`
  padding: 0 0 0 15px;
  margin: 10px 0;

  li {
    margin: 5px 0;
    font-size: 15px;
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
  const {
    user: username,
    chatGroups,
    privateChats,
    onlineUsers,
  } = useTypedSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const changeChatHandler = (type: ExistingChatTypes, chatName?: string) => {
    dispatch(changeChat(type, chatName));
  };
  const toggleModalHandler = () => {
    setShowModal((prevstate) => !prevstate);
  };

  const otherOnlineUsers = onlineUsers.filter((user) => user !== username);

  return (
    <StyledChatsList>
      <h1>name: {username}</h1>

      <ChatsSection>
        <h2 onClick={() => changeChatHandler('PUBLIC')}>Public</h2>
      </ChatsSection>

      <ChatsSection>
        <h2>Groups</h2>

        {chatGroups.length > 0 && (
          <ChatGroup>
            {chatGroups.map((group) => (
              <li
                key={group.name}
                onClick={() => changeChatHandler('GROUPS', group.name)}
              >
                {group.name}
              </li>
            ))}
          </ChatGroup>
        )}
        {chatGroups.length === 0 && <span>No groups created yet...</span>}

        <Button onClick={toggleModalHandler}>+ create new group</Button>
      </ChatsSection>

      <ChatsSection>
        <h2>Private chats</h2>

        {privateChats.length > 0 && (
          <ChatGroup>
            {privateChats.map((group) => (
              <li
                key={group.name}
                onClick={() => changeChatHandler('PRIVATE', group.name)}
              >
                {group.name}
              </li>
            ))}
          </ChatGroup>
        )}
        {privateChats.length === 0 && (
          <span>No private conversations found</span>
        )}
      </ChatsSection>

      <ChatsSection>
        <h2>Online users:</h2>
        {otherOnlineUsers.length > 0 && (
          <ul>
            {otherOnlineUsers.map((user) => (
              <li key={`id_${user}`}>{user}</li>
            ))}
          </ul>
        )}
        {otherOnlineUsers.length === 0 && <span>No other user online</span>}
      </ChatsSection>

      {showModal && <NewGroupInput onClose={toggleModalHandler} />}
    </StyledChatsList>
  );
};

export default ChatsList;
