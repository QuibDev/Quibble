// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Messages, ChatRoom, ChatRoomUser, User } = initSchema(schema);

export {
  Messages,
  ChatRoom,
  ChatRoomUser,
  User
};