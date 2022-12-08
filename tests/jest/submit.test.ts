import { handler } from '../../netlify/functions/submit';
import { mockContext, mockResponseCb, toRequestFromBody } from '../server-utils';

describe('submit function', () => {
	it('returns formatted 400 on malformed data', async () => {
		const req = toRequestFromBody({});
		const res = await handler(req, mockContext, mockResponseCb);
		expect(res?.statusCode).toEqual(400);

		const body = JSON.parse(res?.body ?? '{}');
		expect(body).toHaveProperty('invalidFields');
		expect(body.invalidFields).toHaveProperty('name');
		expect(body.invalidFields).toHaveProperty('favoriteHexCode');
	});
	it('returns formatted 400 on empty name', async () => {
		const req = toRequestFromBody({
			name: null,
			favoriteHexCode: '#ccc',
		});
		const res = await handler(req, mockContext, mockResponseCb);
		expect(res?.statusCode).toEqual(400);

		const body = JSON.parse(res?.body ?? '{}');
		expect(body).toHaveProperty('invalidFields');
		expect(body.invalidFields).toHaveProperty('name');
		expect(body.invalidFields).not.toHaveProperty('favoriteHexCode');
	});
	it.each([
		undefined, // not present
		'cc', // missing #
		'#ccdde', // incomplete
	])('returns formatted 400 when favorite hex code is "%s"', async (favoriteHexCode) => {
		const req = toRequestFromBody({
			name: 'hello',
			favoriteHexCode,
		});
		const res = await handler(req, mockContext, mockResponseCb);
		expect(res?.statusCode).toEqual(400);

		const body = JSON.parse(res?.body ?? '{}');
		expect(body).toHaveProperty('invalidFields');
		expect(body.invalidFields).toHaveProperty('favoriteHexCode');
		expect(body.invalidFields).not.toHaveProperty('name');
	});
	it('returns formatted 200 with message', async () => {
		const name = 'Evan You';
		const favoriteHexCode = '#ddd';
		const req = toRequestFromBody({ name, favoriteHexCode });
		const res = await handler(req, mockContext, mockResponseCb);
		expect(res?.statusCode).toEqual(200);

		const body = JSON.parse(res?.body ?? '{}');
		expect(body).toHaveProperty('message');
		expect(body.name).toEqual(name);
		expect(body.favoriteHexCode).toEqual(favoriteHexCode);
	});
});
