// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MessageStatus = {
  "SENT": "SENT",
  "DELIVERED": "DELIVERED",
  "READ": "READ"
};

const { Messages, ChatRoom, ChatRoomUser, User } = initSchema(schema);

export {
  Messages,
  ChatRoom,
  ChatRoomUser,
  User,
  MessageStatus
};