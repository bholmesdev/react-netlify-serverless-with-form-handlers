import Form from '../src/components/Form';
import { render } from '@testing-library/react';

export const formSetup = () => {
	const form = render(<Form />);
	const nameInput = form.container.querySelector('[name="name"]');
	const hexCodeInput = form.container.querySelector('[name="favoriteHexCode"]');
	const submitButton = form.container.querySelector('[type="submit"]');

	if (
		!(nameInput instanceof HTMLInputElement) ||
		!(hexCodeInput instanceof HTMLInputElement) ||
		!(submitButton instanceof HTMLButtonElement)
	) {
		throw new Error('Issue during test setup. Some form inputs undefined!');
	}

	return { form, nameInput, hexCodeInput, submitButton };
};
