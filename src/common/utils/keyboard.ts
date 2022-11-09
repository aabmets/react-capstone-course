type KeyPress = React.KeyboardEvent<HTMLDivElement>;
type Closure = (event: KeyPress) => void;
type Callback = () => void;


export function noTabFocusWhen(condition: boolean): Closure {
	function closure(event: KeyPress) {
		if (event.key === 'Tab' && condition) {
			event.preventDefault();
		}
	}
	return closure;
}

export function callWhenKeypress(key: string, callback: Callback): Closure {
	function closure(event: KeyPress) {
		if (event.key === key) {
			callback();
		}
	}
	return closure;
}