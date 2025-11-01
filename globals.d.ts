declare module "*.css" {
	const content: Record<string, string>;
	export default content;
}

// Google Analytics
interface Window {
	gtag: (
		command: "config" | "event" | "js" | "set",
		targetId: string | undefined,
		config?: Record<string, unknown>,
	) => void;
	fbq: (
		command: "track" | "trackCustom",
		eventName: string,
		options?: Record<string, unknown>,
	) => void;
}
