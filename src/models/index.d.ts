import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MessagesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomUsersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UsersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class ChatRoom {
  readonly id: string;
  readonly newMessages?: string;
  readonly LastMessage?: Messages;
  readonly Messages?: (Messages | null)[];
  readonly ChatRoomUsers?: (ChatRoomUsers | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoom, ChatRoomMetaData>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}

export declare class Messages {
  readonly id: string;
  readonly Content?: string;
  readonly chatroomID?: string;
  readonly usersID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Messages, MessagesMetaData>);
  static copyOf(source: Messages, mutator: (draft: MutableModel<Messages, MessagesMetaData>) => MutableModel<Messages, MessagesMetaData> | void): Messages;
}

export declare class ChatRoomUsers {
  readonly id: string;
  readonly chatroom: ChatRoom;
  readonly users: Users;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoomUsers, ChatRoomUsersMetaData>);
  static copyOf(source: ChatRoomUsers, mutator: (draft: MutableModel<ChatRoomUsers, ChatRoomUsersMetaData>) => MutableModel<ChatRoomUsers, ChatRoomUsersMetaData> | void): ChatRoomUsers;
}

export declare class Users {
  readonly id: string;
  readonly name: string;
  readonly imageUri?: string;
  readonly status?: string;
  readonly chatrooms?: (ChatRoomUsers | null)[];
  readonly Messages?: (Messages | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Users, UsersMetaData>);
  static copyOf(source: Users, mutator: (draft: MutableModel<Users, UsersMetaData>) => MutableModel<Users, UsersMetaData> | void): Users;
}