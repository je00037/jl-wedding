import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { compare } from "bcrypt";

const client = new DynamoDBClient({
  region: "eu-west-2",
  credentials: {
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    accessKeyId: process.env.REACT_APP_AWS_ID,
  },
});

const reqParams: GetItemCommandInput = {
  TableName: "Wedding",
  Key: { userId: { N: "0" } },
  ProjectionExpression: "pwd_hash",
};

const getHash = async () => {
  let hash: string;
  try {
    const req = new GetItemCommand(reqParams);
    const dbdata = await client.send(req);
    const data = dbdata?.Item && unmarshall(dbdata.Item);
    hash = data.pwd_hash;
  } catch (e) {
    console.log("error! ", e);
  }
  return hash;
};

async function comparePwd(input: string) {
  const hash = await getHash();
  const result = await compare(input, hash);
  if (result === true) {
    console.log("Successful match!");
  } else {
    console.log("Wrong password!");
  }
  return result;
}

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const givenPwd = event.body;
  const result = await comparePwd(givenPwd);
  console.log({ result });
  if (result) {
    return {
      statusCode: 200,
      body: JSON.stringify({ successfulLogin: true }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ successfulLogin: false }),
    };
  }
};

export { handler };
