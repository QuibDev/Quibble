// ! Custom Lambda trigger to sync user profiles between cognito and DynamodDB 


const aws = require("aws-sdk");

// use it to read / write to ddb
const ddb = new aws.DynamoDB();


// access user table from enviroment variable 
const tableName = process.env.USERTABLE;


// we have to await for ddb command to finish hence async function
exports.handler = async (event) => {

  // event contain --> event.request.userAttributes.(sub,)
  // sub is unique for each cognito user so we're gonna use it as a key
  // save a new user to DynamoDB

  if (!event?.request?.userAttributes?.sub){
    console.log("No sub provided");
    return;
  }

  const now = new Date();
  const timestamp = now.getTime();

  // strings you need S 
  // numbers you need N

  const userItem = {
    __typename: { S: 'User'},
    _lastChangedAt: { N: timestamp.toString() },
    _version: { N: "1" },
    createdAt: { S: now.toISOString() },
    updatedAt: { S: now.toISOString() },
    id: { S: event.request.userAttributes.sub},
    name: { S: event.request.userAttributes.email},
  }

  const params = {
    Item: userItem,
    TableName: tableName
  };

  // save user to database

  try {
    await ddb.putItem(params).promise();
    console.log('\nSUCCESS: userUpdated DynamoDB')
  } catch (e) {
    console.log(e)
  }

};