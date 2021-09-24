// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ChatRoom, ChatRoomUser, User, Messages } = initSchema(schema);

export {
  ChatRoom,
  ChatRoomUser,
  User,
  Messages
};