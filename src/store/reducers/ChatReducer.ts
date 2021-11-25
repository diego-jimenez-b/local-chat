import { ChatsListType } from '../../models/models';
import {
  CHANGE_USERNAME,
  DELETE_MESSAGE,
  GROUP,
  PRIVATE,
  PUBLIC,
  SEND_MESSAGE,
  UPDATE_CHAT,
  USERS,
} from '../actions/ChatActions';
import { ChatMessageType } from '../../models/models';

interface ChatReducerType extends ChatsListType {
  user: string;
  currentChat: string;
  currentChatMessages: ChatMessageType[];
  onlineUsers: string[];
}
type ActionType =
  | { type: typeof SEND_MESSAGE; message: ChatMessageType }
  | { type: typeof DELETE_MESSAGE; id: string }
  | { type: typeof CHANGE_USERNAME; newUsername: string }
  | {
      type: typeof UPDATE_CHAT;
      chatType: string;
      updatedChat: ChatMessageType[];
    };

const rug = require('random-username-generator');
const existingUsername = sessionStorage.getItem('username');
let randomUsername = existingUsername;
if (!existingUsername) {
  randomUsername = rug.generate();
  sessionStorage.setItem('username', randomUsername!);
}

const storagePublicChat = localStorage.getItem(PUBLIC);
const storageChatGroups = localStorage.getItem(GROUP);
const storagePrivateChats = localStorage.getItem(PRIVATE);
const storageOnlineUsers = localStorage.getItem(USERS);

const initialState: ChatReducerType = {
  user: randomUsername!,
  currentChat: PUBLIC,
  publicChat: storagePublicChat ? JSON.parse(storagePublicChat) : [],
  chatGroups: storageChatGroups ? JSON.parse(storageChatGroups) : [],
  privateChats: storagePrivateChats ? JSON.parse(storagePrivateChats) : [],
  currentChatMessages: storagePublicChat ? JSON.parse(storagePublicChat) : [],
  onlineUsers: storageOnlineUsers ? JSON.parse(storageOnlineUsers) : [],
};

export const ChatReducer = (
  state = initialState,
  action: ActionType
): ChatReducerType => {
  if (action.type === SEND_MESSAGE) {
    if (state.currentChat === PUBLIC) {
      const updatedChat = state.publicChat.concat(action.message);
      localStorage.setItem(PUBLIC, JSON.stringify(updatedChat));

      return {
        ...state,
        publicChat: updatedChat,
        currentChatMessages: updatedChat,
      };
    }

    if (state.currentChat === GROUP) {
      const groupChatIndex = state.chatGroups.findIndex(
        (group) => group.name === state.currentChat
      )!;
      const groupChat = state.chatGroups[groupChatIndex];

      const updatedChat = groupChat!.chat.concat(action.message);
      const updatedGroupChat = { ...groupChat, chat: updatedChat };
      let updatedGroups = [...state.chatGroups];
      updatedGroups[groupChatIndex] = updatedGroupChat;

      localStorage.setItem(GROUP, JSON.stringify(updatedGroups));

      return {
        ...state,
        chatGroups: updatedGroups,
        currentChatMessages: updatedGroupChat.chat,
      };
    }

    // if (state.currentChat === PUBLIC) {
    //   const updatedChat = state.publicChat.concat(action.message);

    //   localStorage.setItem(PUBLIC, JSON.stringify(updatedChat));

    //   return {
    //     ...state,
    //     publicChat: updatedChat,
    //   };
    // }
  }

  if (action.type === UPDATE_CHAT) {
    if (action.chatType === state.currentChat) {
      return {
        ...state,
        publicChat: action.updatedChat,
        currentChatMessages: action.updatedChat,
      };
    }
  }

  return state;
};
