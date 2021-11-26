import {
  ChatMessageType,
  GroupChatType,
  PrivateChatType,
} from '../../models/models';

export const PUBLIC = 'PUBLIC';
export const GROUPS = 'GROUPS';
export const PRIVATE = 'PRIVATE';
export const USERS = 'USERS';
export type ExistingChatTypes =
  | typeof PUBLIC
  | typeof GROUPS
  | typeof PRIVATE
  | typeof USERS;

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const UPDATE_CHAT = 'UPDATE_CHAT';
export const CHANGE_CHAT = 'CHANGE_CHAT';
export const CREATE_NEW_GROUP = 'CREATE_NEW_GROUP';
export const START_PRIVATE_CHAT = 'START_PRIVATE_CHAT';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const CHANGE_USERNAME = 'CHANGE_USERNAME';

export const sendMessage = (message: ChatMessageType) => {
  return { type: SEND_MESSAGE, message };
};

export const deleteMessage = (id: string) => {
  return { type: DELETE_MESSAGE, id };
};

export const updateChat = (
  type: ExistingChatTypes,
  updatedChat: ChatMessageType[] | GroupChatType[] | PrivateChatType[]
) => {
  return { type: UPDATE_CHAT, chatType: type, updatedChat };
};

export const changeChat = (chatType: ExistingChatTypes, chatName: string) => {
  return { type: CHANGE_CHAT, chatType, chatName: chatName };
};

export const createNewGroup = (groupName: string) => {
  return { type: CREATE_NEW_GROUP, groupName };
};

export const startPrivateChat = (username: string) => {
  return { type: START_PRIVATE_CHAT, username };
};

export const addUser = () => {
  return { type: ADD_USER };
};
export const removeUser = () => {
  return { type: REMOVE_USER };
};

export const changeUsername = (newUsername: string) => {
  return { type: CHANGE_USERNAME, newUsername };
};
