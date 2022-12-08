import styles from './Form.module.css';
import React, { useState, useRef } from 'react';
import type { Response } from '../../netlify/functions/submit';
import SubmitButton from './SubmitButton';

export default function Form() {
	const [response, setResponse] = useState<Response | undefined>();
	const formRef = useRef<HTMLFormElement>(null);

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		// check that our form is wired up in React before submitting
		if (formRef.current === null) return;
		const formData = new FormData(formRef.current);
		const entries = Object.fromEntries(formData.entries());

		const res = await fetch('/.netlify/functions/submit', {
			method: 'POST',
			body: JSON.stringify(entries),
		});
		if (res?.status !== 200) return;
		formRef.current.reset();
		const body = await res.json();
		setResponse(body);
	}

	return (
		<>
			<form ref={formRef} onSubmit={onSubmit} className={styles.form}>
				<label htmlFor="name" className={styles.label}>
					Name
				</label>
				<input required name="name" id="name" className={styles.input} type="text" />
				<p>{response?.invalidFields?.name ? response.invalidFields.name : null}</p>
				<label htmlFor="favoriteHexCode" className={styles.label}>
					Favorite Hex Code
				</label>
				<input
					required
					name="favoriteHexCode"
					id="favoriteHexCode"
					className={styles.input}
					type="text"
				/>
				<p>
					{response?.invalidFields?.favoriteHexCode ? response.invalidFields.favoriteHexCode : null}
				</p>
				<SubmitButton />
			</form>
			{response?.message ? <p>{response.message}</p> : null}
		</>
	);
}
