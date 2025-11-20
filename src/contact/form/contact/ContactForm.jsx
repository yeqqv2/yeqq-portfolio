import { useState } from "react";
import styles from "./style.module.css";

export default function ContactForm({ onSuccess, onError }) {

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);

        try {
            // Formspree POST
            const res = await fetch("https://formspree.io/f/mvglyqek", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            const data = await res.json();

            if (data.ok) {
                setLoading(false);
                onSuccess();
            } else {
                setLoading(false);
                onError();
            }
        } catch (err) {
            setLoading(false);
            onError();
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.input_group}>
                <label className={styles.label} htmlFor="name">
                    name,surname
                </label>
                <input
                    className={styles.input}
                    name="fullname"
                    type="text"
                    placeholder="yunus emre korkmaz"
                    required
                />
            </div>

            <div className={styles.input_group}>
                <label className={styles.label} htmlFor="company">
                    company
                </label>
                <input
                    className={styles.input}
                    name="company"
                    type="text"
                    placeholder="apple computer, inc."
                />
            </div>

            <div className={styles.input_group}>
                <label className={styles.label} htmlFor="email">
                    email
                </label>
                <input
                    className={styles.input}
                    name="email"
                    type="email"
                    placeholder="example@example.com"
                    required
                />
            </div>

            <div className={styles.input_group}>
                <label className={styles.label} htmlFor="tel">
                    phone
                </label>
                <input
                    className={styles.input}
                    name="phone"
                    type="tel"
                    placeholder="+90 555 555 55 55"
                />
            </div>

            <div className={styles.input_group}>
                <label className={styles.label} htmlFor="subject">
                    subject
                </label>
                <input
                    className={styles.input}
                    name="subject"
                    type="text"
                    placeholder="web app, mobile app, UI/UX design"
                />
            </div>

            <div className={styles.textarea_group}>
                <label className={styles.label} htmlFor="message">
                    message
                </label>
                <textarea
                    className={styles.textarea}
                    name="message"
                    placeholder="describe whatever you want."
                    required
                />
            </div>

            <button disabled={loading} type="submit" className={styles.button}>
                {loading ? "● sending" : "● let's get started"}
            </button>
        </form>
    );
}
