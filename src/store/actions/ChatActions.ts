import {
  ChatMessageType,
  GroupChatType,
  PrivateChatType,
} from '../../models/models';

export const PUBLIC = 'PUBLIC';
export const GROUPS = 'GROUPS';
export const PRIVATE = 'PRIVATE';
export const USERS = 'USERS';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const sendMessage = (
  message: ChatMessageType,
  chatType: ExistingChatTypes = PUBLIC,
  chatName?: string
) => {
  return { type: SEND_MESSAGE, chatType, chatName, message };
};

export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const deleteMessage = (id: string) => {
  return { type: DELETE_MESSAGE, id };
};

export type ExistingChatTypes = typeof PUBLIC | typeof GROUPS | typeof PRIVATE;

export const CHANGE_CHAT = 'CHANGE_CHAT';
export const changeChat = (type: ExistingChatTypes, chatName?: string) => {
  return { type: CHANGE_CHAT, chatType: type, chatName: chatName || null };
};

export const UPDATE_CHAT = 'UPDATE_CHAT';
export const updateChat = (
  type: string,
  updatedChat: ChatMessageType[] | GroupChatType[] | PrivateChatType[]
) => {
  return { type: UPDATE_CHAT, chatType: type, updatedChat };
};

export const CREATE_NEW_GROUP = 'CREATE_NEW_GROUP';
export const createNewGroup = (groupName: string) => {
  return { type: CREATE_NEW_GROUP, groupName };
};

export const ADD_USER = 'ADD_USER';
export const addUser = (username: string) => {
  return { type: ADD_USER, username };
};
export const REMOVE_USER = 'REMOVE_USER';
export const removeUser = (username: string) => {
  return { type: REMOVE_USER, username };
};

export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const changeUsername = (newUsername: string) => {
  return { type: CHANGE_USERNAME, newUsername };
};
