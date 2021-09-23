// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ChatRoom, Messages, ChatRoomUsers, Users } = initSchema(schema);

export {
  ChatRoom,
  Messages,
  ChatRoomUsers,
  Users
};