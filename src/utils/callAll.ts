type CallBack<Params extends unknown[]> = (...args: Params) => void;

export const callAll =
	<Params extends unknown[]>(...fns: Array<CallBack<Params> | undefined>) =>
	(...args: Params) => {
		for (const fn of fns) {
			if (typeof fn === "function") {
				fn(...args);
			}
		}
	};
