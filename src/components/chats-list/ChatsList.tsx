import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  changeChat,
  ExistingChatTypes,
  startPrivateChat,
} from '../../store/actions/ChatActions';

import styled from 'styled-components';
import SearchInput from './SearchInput';
import ModalInput from '../modal-input/ModalInput';

const StyledChatsList = styled.div`
  background-color: #670d7e;
  color: white;
  width: 350px;
  font-weight: bold;

  & > h1 {
    display: block;
    margin: 30px 0 20px;
    padding: 0 5px;
    font-size: 20px;
  }
  & > button {
    margin-bottom: 10px;
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
    display: block;
    margin: 6px 5px 0;
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
    chatGroups: reducerChatGroups,
    privateChats: reducerPrivateChats,
    onlineUsers,
  } = useTypedSelector((state) => state.chat);
  const dispatch = useDispatch();

  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showNameChangeModal, setShowNameChangeModal] = useState(false);
  const [chatGroupsFilter, setGroupsFilter] = useState('');
  const [privateChatsFilter, setPrivateChatsFilter] = useState('');

  const changeChatHandler = (type: ExistingChatTypes, chatName: string) => {
    dispatch(changeChat(type, chatName));
  };

  const startPrivateChatHandler = (username: string) => {
    dispatch(startPrivateChat(username));
  };

  const searchGroupsHandler = (input: string) => {
    setGroupsFilter(input.toLowerCase());
  };
  const searchPrivateChatHandler = (input: string) => {
    setPrivateChatsFilter(input.toLowerCase());
  };

  const toggleGroupModalHandler = () => {
    setShowNewGroupModal((prevstate) => !prevstate);
  };
  const toggleNameModalHandler = () => {
    setShowNameChangeModal((prevstate) => !prevstate);
  };

  const chatGroups = reducerChatGroups.filter((group) =>
    group.name.toLowerCase().startsWith(chatGroupsFilter)
  );
  const privateChats = reducerPrivateChats.filter((chat) => {
    const otherMember =
      chat.members[0] === username ? chat.members[1] : chat.members[0];
    return otherMember.startsWith(privateChatsFilter);
  });

  const otherOnlineUsers = onlineUsers.filter((user) => user !== username);
  const currentPrivateChats = privateChats.filter((chat) =>
    chat.members.includes(username)
  );

  return (
    <StyledChatsList>
      <h1>name: {username}</h1>
      <Button onClick={toggleNameModalHandler}>change username</Button>

      <ChatsSection>
        <h2 onClick={() => changeChatHandler('PUBLIC', '')}>Public</h2>
      </ChatsSection>

      <ChatsSection>
        <h2>Groups</h2>
        <SearchInput
          placeholder='search group'
          onUserInput={searchGroupsHandler}
        />

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
        {chatGroups.length === 0 && <span>No groups found...</span>}

        <Button onClick={toggleGroupModalHandler}>+ create new group</Button>
      </ChatsSection>

      <ChatsSection>
        <h2>Private chats</h2>
        <SearchInput
          placeholder='search private chat'
          onUserInput={searchPrivateChatHandler}
        />

        {currentPrivateChats.length > 0 && (
          <ChatGroup>
            {currentPrivateChats.map((group) => (
              <li
                key={group.members.toString()}
                onClick={() =>
                  changeChatHandler(
                    'PRIVATE',
                    group.members[0] !== username
                      ? group.members[0]
                      : group.members[1]
                  )
                }
              >
                {group.members[0] !== username
                  ? group.members[0]
                  : group.members[1]}
              </li>
            ))}
          </ChatGroup>
        )}
        {currentPrivateChats.length === 0 && (
          <span>No private conversations found</span>
        )}
      </ChatsSection>

      <ChatsSection>
        <h2>Online users:</h2>
        {otherOnlineUsers.length > 0 && (
          <ul>
            {otherOnlineUsers.map((user) => (
              <li
                key={`id_${user}`}
                onClick={() => startPrivateChatHandler(user)}
              >
                {user}
              </li>
            ))}
          </ul>
        )}
        {otherOnlineUsers.length === 0 && <span>No other user online</span>}
      </ChatsSection>

      {showNewGroupModal && (
        <ModalInput
          changeType='GROUP'
          onClose={toggleGroupModalHandler}
          placeholder='Enter a new group name'
          btnText='create group'
        />
      )}
      {showNameChangeModal && (
        <ModalInput
          changeType='NAME'
          onClose={toggleNameModalHandler}
          placeholder='Enter a new username'
          btnText='change username'
        />
      )}
    </StyledChatsList>
  );
};

export default ChatsList;
