import {
  ChatsListType,
  GroupChatType,
  PrivateChatType,
} from '../../models/models';
import {
  ADD_USER,
  CHANGE_CHAT,
  CHANGE_USERNAME,
  CREATE_NEW_GROUP,
  DELETE_MESSAGE,
  ExistingChatTypes,
  GROUPS,
  PRIVATE,
  PUBLIC,
  REMOVE_USER,
  SEND_MESSAGE,
  START_PRIVATE_CHAT,
  UPDATE_CHAT,
  USERS,
} from '../actions/ChatActions';
import { ChatMessageType } from '../../models/models';
import { getStorageItem } from '../../helpers/helpers';

interface ChatReducerType extends ChatsListType {
  user: string;
  currentChat: string;
  currentChatName: string;
  currentChatMessages: ChatMessageType[];
  onlineUsers: string[];
}
type ActionType =
  | {
      type: typeof SEND_MESSAGE;
      chatType: ExistingChatTypes;
      chatName?: string;
      message: ChatMessageType;
    }
  | { type: typeof DELETE_MESSAGE; id: string }
  | { type: typeof CHANGE_USERNAME; newUsername: string }
  | { type: typeof CHANGE_CHAT; chatType: ExistingChatTypes; chatName?: string }
  | {
      type: typeof UPDATE_CHAT;
      chatType: string;
      updatedChat: any[];
    }
  | { type: typeof CREATE_NEW_GROUP; groupName: string }
  | { type: typeof START_PRIVATE_CHAT; username: string }
  | { type: typeof ADD_USER; username: string }
  | { type: typeof REMOVE_USER; username: string };

const rug = require('random-username-generator');
const existingUsername = sessionStorage.getItem('username');
let randomUsername = existingUsername;
if (!existingUsername) {
  randomUsername = rug.generate();
  sessionStorage.setItem('username', randomUsername!);
}

const storagePublicChat = getStorageItem(PUBLIC);
const storageChatGroups = getStorageItem(GROUPS);
const storagePrivateChats = getStorageItem(PRIVATE);
const storageOnlineUsers = getStorageItem(USERS);

const initialChatGroups: GroupChatType[] = [
  { name: 'Group-1', chat: [] },
  { name: 'Group-2', chat: [] },
  { name: 'Group-3', chat: [] },
];
if (storageChatGroups.length === 0) {
  localStorage.setItem(GROUPS, JSON.stringify(initialChatGroups));
}

const initialState: ChatReducerType = {
  user: randomUsername!,
  currentChat: PUBLIC,
  currentChatName: '',
  publicChat: storagePublicChat,
  chatGroups:
    storageChatGroups.length > 0 ? storageChatGroups : initialChatGroups,
  privateChats: storagePrivateChats,
  currentChatMessages: storagePublicChat,
  onlineUsers: storageOnlineUsers,
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

    if (state.currentChat === GROUPS) {
      const groupChatIndex = state.chatGroups.findIndex(
        (group) => group.name === action.chatName
      );
      const groupChat = state.chatGroups[groupChatIndex];

      const updatedChat = groupChat!.chat!.concat(action.message);

      const updatedGroupChat = { ...groupChat, chat: updatedChat };
      let updatedGroups = [...state.chatGroups];
      updatedGroups[groupChatIndex] = updatedGroupChat;

      localStorage.setItem(GROUPS, JSON.stringify(updatedGroups));

      return {
        ...state,
        chatGroups: updatedGroups,
        currentChatMessages: updatedGroupChat.chat,
      };
    }

    if (state.currentChat === PRIVATE) {
      const chatIndex = state.privateChats.findIndex((group) =>
        group.members.includes(action.chatName!)
      );
      const chat = state.privateChats[chatIndex];

      const updatedChat = chat.chat.concat(action.message);

      const updatedGroupChat = { ...chat, chat: updatedChat };
      let updatedPrivateChats = [...state.privateChats];
      updatedPrivateChats[chatIndex] = updatedGroupChat;

      localStorage.setItem(PRIVATE, JSON.stringify(updatedPrivateChats));

      return {
        ...state,
        privateChats: updatedPrivateChats,
        currentChatMessages: updatedGroupChat.chat,
      };
    }
  }

  if (action.type === UPDATE_CHAT) {
    const updatedPublicChat =
      action.chatType === PUBLIC ? action.updatedChat : state.publicChat;
    const updatedChatGroups =
      action.chatType === GROUPS ? action.updatedChat : state.chatGroups;
    const updatedPrivateChats =
      action.chatType === PRIVATE ? action.updatedChat : state.privateChats;
    const updatedOnlineUsers =
      action.chatType === USERS ? action.updatedChat : state.onlineUsers;

    let updatedCurrentChat = state.currentChatMessages;
    if (state.currentChat === PUBLIC) {
      updatedCurrentChat = updatedPublicChat;
    } else if (state.currentChat === GROUPS) {
      if (!(state.chatGroups.length < action.updatedChat.length)) {
        const existingChatIndex = updatedChatGroups.findIndex(
          (chat) => chat.name === state.currentChatName
        );
        updatedCurrentChat = updatedChatGroups[existingChatIndex].chat;
      }
    } else if (state.currentChat === PRIVATE) {
      const existingChatIndex = updatedPrivateChats.findIndex((chat) =>
        chat.members.includes(state.currentChatName)
      );

      updatedCurrentChat = updatedPrivateChats[existingChatIndex].chat;
    }

    return {
      ...state,
      publicChat: updatedPublicChat,
      chatGroups: updatedChatGroups,
      privateChats: updatedPrivateChats,
      currentChatMessages: updatedCurrentChat,
      onlineUsers: updatedOnlineUsers,
    };
  }

  if (action.type === CHANGE_CHAT) {
    if (action.chatType === PUBLIC) {
      const publicChat = getStorageItem(PUBLIC);
      return {
        ...state,
        currentChat: PUBLIC,
        currentChatName: '',
        currentChatMessages: publicChat,
      };
    }

    if (action.chatType === GROUPS) {
      const chatGroups = getStorageItem(GROUPS);
      return {
        ...state,
        currentChat: GROUPS,
        currentChatName: action.chatName || '',
        currentChatMessages: chatGroups.find(
          (group) => group.name === action.chatName
        ).chat,
      };
    }

    if (action.chatType === PRIVATE) {
      const updatedChat = state.privateChats.find(
        (chat) =>
          chat.members.includes(state.user) &&
          chat.members.includes(action.chatName!)
      );

      console.log(state.privateChats);
      console.log(updatedChat);

      return {
        ...state,
        currentChat: PRIVATE,
        currentChatName: action.chatName!,
        currentChatMessages: updatedChat!.chat,
      };
    }
  }

  if (action.type === CREATE_NEW_GROUP) {
    if (state.chatGroups.find((group) => group.name === action.groupName)) {
      alert(`Group '${action.groupName}' already exists`);
      return state;
    }

    const updatedChatGroups = state.chatGroups.concat({
      name: action.groupName,
      chat: [],
    });
    localStorage.setItem(GROUPS, JSON.stringify(updatedChatGroups));

    return { ...state, chatGroups: updatedChatGroups };
  }

  if (action.type === START_PRIVATE_CHAT) {
    if (
      state.privateChats.find(
        (chat) =>
          chat.members.includes(action.username) &&
          chat.members.includes(state.user)
      )
    )
      return state;

    const newPrivateChat: PrivateChatType = {
      members: [state.user, action.username],
      chat: [],
    };
    const updatedPrivateChats = state.privateChats.concat(newPrivateChat);

    localStorage.setItem(PRIVATE, JSON.stringify(updatedPrivateChats));

    return {
      ...state,
      privateChats: updatedPrivateChats,
    };
  }

  if (action.type === ADD_USER) {
    if (state.onlineUsers.includes(action.username)) return state;
    const updatedOnlineUsers = state.onlineUsers.concat(action.username);
    localStorage.setItem(USERS, JSON.stringify(updatedOnlineUsers));
    return { ...state, onlineUsers: updatedOnlineUsers };
  }
  if (action.type === REMOVE_USER) {
    const updatedOnlineUsers = state.onlineUsers.filter(
      (user) => user !== action.username
    );
    localStorage.setItem(USERS, JSON.stringify(updatedOnlineUsers));
    return { ...state, onlineUsers: updatedOnlineUsers };
  }

  return state;
};
