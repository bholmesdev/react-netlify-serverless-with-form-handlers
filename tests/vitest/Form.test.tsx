/**
 * @jest-environment jsdom
 */
import { fireEvent, waitFor } from '@testing-library/react';
// note: you can make these globally available from vite.config.js
// see the Vitest docs for more: https://vitest.dev/config/#globals
import { describe, expect, it, vi } from 'vitest';
import { formSetup } from '../client-utils';

describe('Form', () => {
	it('resets on successful submission', async () => {
		const { nameInput, hexCodeInput, submitButton } = formSetup(vi);
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
