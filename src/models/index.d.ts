import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type MessagesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Messages {
  readonly id: string;
  readonly content?: string;
  readonly chatroomID?: string;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Messages, MessagesMetaData>);
  static copyOf(source: Messages, mutator: (draft: MutableModel<Messages, MessagesMetaData>) => MutableModel<Messages, MessagesMetaData> | void): Messages;
}

export declare class ChatRoom {
  readonly id: string;
  readonly newMessages?: string;
  readonly LastMessage?: Messages;
  readonly ChatRoomUsers?: (ChatRoomUser | null)[];
  readonly Messages?: (Messages | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoom, ChatRoomMetaData>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}

export declare class ChatRoomUser {
  readonly id: string;
  readonly chatroom: ChatRoom;
  readonly user: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoomUser, ChatRoomUserMetaData>);
  static copyOf(source: ChatRoomUser, mutator: (draft: MutableModel<ChatRoomUser, ChatRoomUserMetaData>) => MutableModel<ChatRoomUser, ChatRoomUserMetaData> | void): ChatRoomUser;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly ImageUri?: string;
  readonly status?: string;
  readonly chatrooms?: (ChatRoomUser | null)[];
  readonly Messages?: (Messages | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}