import type { HandlerEvent, HandlerContext } from '@netlify/functions';

export function toRequestFromBody(body: any) {
	return { body: JSON.stringify(body) } as HandlerEvent;
}

export const mockContext: HandlerContext = {
	callbackWaitsForEmptyEventLoop: false,
	functionName: 'handler',
	functionVersion: '1.0',
	invokedFunctionArn: 'arn:aws:lambda:us-east-1:871031295720:function:handler:1.0',
	memoryLimitInMB: '62',
	awsRequestId: '11dba8bd-577f-8040-0076-1607441e9f1d',
	logGroupName: 'Group name',
	logStreamName: 'Stream name',
	identity: undefined,
	clientContext: {},
	getRemainingTimeInMillis: () => 0,
	done: () => null,
	fail: () => null,
	succeed: () => null,
};

export const mockResponseCb = () => new Response();
