import styled from 'styled-components';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface MessageProps {
  readonly author: boolean;
}

const ChatContanier = styled.section`
  border: 2px solid black;
  height: 80%;
  padding: 0 15px;
  position: relative;
  flex-grow: 1;
  overflow: auto;

  p {
    margin: 0;
    padding: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 20px;
    text-align: center;
  }
`;

const MessageBubble = styled.li<MessageProps>`
  width: 100%;
  margin: 13px 0 43px;
  padding: 0 5px;
  text-align: ${(props) => (props.author ? 'right' : 'left')};
  position: relative;

  & > span {
    padding: 7px 15px;
    border: 1px solid black;
    border-radius: 15px;
    font-size: 14px;
  }
`;
const MessageInfo = styled.span<MessageProps>`
  display: block;
  width: 100%;
  width: auto;
  margin-left: 5px;
  font-size: 13px;
  position: absolute;
  top: 27px;
  right: ${(props) => (props.author ? '5px' : 'auto')};
`;

const MessagesList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const MainChat = () => {
  const chat = useTypedSelector((state) => state.chat.currentChatMessages);
  const username = useTypedSelector((state) => state.chat.user);

  return (
    <ChatContanier>
      {chat.length > 0 && (
        <MessagesList>
          {chat.map((message) => (
            <MessageBubble
              author={message.author === username}
              key={message.id}
            >
              <span>
                {message.text}
                <MessageInfo author={message.author === username}>
                  {message.author === username ? 'you' : message.author} -{' '}
                  {message.date}
                </MessageInfo>
              </span>
            </MessageBubble>
          ))}
        </MessagesList>
      )}

      {chat.length === 0 && <p>No messages yet, start a conversation!</p>}
    </ChatContanier>
  );
};

export default MainChat;
