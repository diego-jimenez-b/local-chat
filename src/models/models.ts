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

export interface PrivateChatType extends GroupChatType {
  members: [string, string];
}

export interface ChatsListType {
  publicChat: ChatMessageType[];
  chatGroups: GroupChatType[];
  privateChats: PrivateChatType[];
}
