/**
 * @jest-environment jsdom
 */
import { fireEvent, waitFor } from '@testing-library/react';
import { formSetup } from '../client-utils';

describe('Form', () => {
	it('resets on successful submission', async () => {
		const { nameInput, hexCodeInput, submitButton } = formSetup(jest);
		fireEvent.input(nameInput, { target: { value: 'Evan Who?' } });
		fireEvent.input(hexCodeInput, { target: { value: '#ccc' } });
		expect(nameInput.value).toEqual('Evan Who?');
		expect(hexCodeInput.value).toEqual('#ccc');

		await waitFor(() => {
			fireEvent.click(submitButton);
			expect(nameInput.value).toEqual('');
			expect(hexCodeInput.value).toEqual('');
		});
	});
});
