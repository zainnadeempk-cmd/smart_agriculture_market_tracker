import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

declare global {
	interface Window {
		google?: any;
	}
}

export function TranslateToggle() {
	const [current, setCurrent] = useState<'en' | 'ur'>('en');

	useEffect(() => {
		// Try to sync with existing selection on load
		const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
		if (combo && combo.value) {
			setCurrent(combo.value === 'ur' ? 'ur' : 'en');
		}
	}, []);

	function setCookie(name: string, value: string) {
		const domain = window.location.hostname;
		document.cookie = `${name}=${value};path=/;max-age=31536000`;
		// set cookie for domain as well (some envs require it)
		document.cookie = `${name}=${value};domain=.${domain};path=/;max-age=31536000`;
	}

	const setLanguage = (lang: 'en' | 'ur') => {
		const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
		if (combo) {
			if (combo.value !== lang) {
				combo.value = lang;
				combo.dispatchEvent(new Event('change'));
			}
			setCurrent(lang);
			return;
		}
		// Fallback: use cookie method and reload so Google auto-applies
		const cookieValue = lang === 'ur' ? '/en/ur' : '/ur/en';
		setCookie('googtrans', cookieValue);
		setCookie('googtrans', cookieValue); // set on root and domain
		setCurrent(lang);
		window.location.reload();
	};

	const toggle = () => setLanguage(current === 'en' ? 'ur' : 'en');

	return (
		<Button size="sm" variant="secondary" onClick={toggle} title="Translate">
			{current === 'en' ? 'اردو' : 'English'}
		</Button>
	);
}


