import { ChatMessageType } from '../../models/models';

export const PUBLIC = 'PUBLIC';
export const GROUP = 'GROUP';
export const PRIVATE = 'PRIVATE';
export const USERS = 'USERS';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const sendMessage = (message: ChatMessageType) => {
  return { type: SEND_MESSAGE, message };
};

export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const deleteMessage = (id: string) => {
  return { type: DELETE_MESSAGE, id };
};

export const CHANGE_CHAT = 'CHANGE_CHAT';
export const changeChat = (chatName: string) => {
  return { type: CHANGE_CHAT, chatName };
};

export const UPDATE_CHAT = 'UPDATE_CHAT';
export const updateChat = (type: string, updatedChat: ChatMessageType[]) => {
  return { type: UPDATE_CHAT, chatType: type, updatedChat };
};

export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const changeUsername = (newUsername: string) => {
  return { type: CHANGE_USERNAME, newUsername };
};
