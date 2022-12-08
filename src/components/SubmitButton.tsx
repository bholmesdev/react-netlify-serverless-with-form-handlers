import styles from './Form.module.css';

export default function SubmitButton() {
	return (
		<button type="submit" className={styles.button}>
			Send away!
		</button>
	);
}
