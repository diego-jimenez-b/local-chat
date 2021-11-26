export interface ChatMessageType {
  id: string;
  date: string;
  author: string;
  text: string;
}

export interface GroupChatType {
  name: string;
  chat: ChatMessageType[];
}

export interface PrivateChatType {
  members: [string, string];
  chat: ChatMessageType[];
}

export interface ChatsListType {
  publicChat: ChatMessageType[];
  chatGroups: GroupChatType[];
  privateChats: PrivateChatType[];
}

export type MessagesArraysType =
  | ChatMessageType[]
  | GroupChatType[]
  | PrivateChatType[];
