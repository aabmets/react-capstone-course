type KeyPress = React.KeyboardEvent<HTMLDivElement>;
type Closure = (event: KeyPress) => void;


export function noTabFocusWhen(condition: boolean): Closure {
	function closure(event: KeyPress) {
		if (event.key === 'Tab' && condition) {
			event.preventDefault();
		}
	}
	return closure;
}