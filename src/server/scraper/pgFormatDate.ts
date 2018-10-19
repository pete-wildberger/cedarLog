// Convert Javascript date to Pg YYYY MM DD HH MI SS
// https://gist.github.com/jczaplew/f055788bf851d0840f50
export function pgFormatDate(date: Date): string {
	/* Via http://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date */
	function zeroPad(d: number): string {
		return ('0' + d).slice(-2);
	}

	const parsed: Date = new Date(date);

	return [
		parsed.getUTCFullYear(),
		zeroPad(parsed.getMonth() + 1),
		zeroPad(parsed.getDate()),
		zeroPad(parsed.getHours()),
		zeroPad(parsed.getMinutes()),
		zeroPad(parsed.getSeconds())
	].join(' ');
}
