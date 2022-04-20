const moment = require('moment');
// e.g. "1d23h50m60s
const parseDateString = function(dateString) {
	const future = moment.utc();

	const regexp = new RegExp('^(?:(\\d+)d)?(?:(\\d+)h)?(?:(\\d+)m)?(?:(\\d+)s)?$');
	const matches = regexp.exec(dateString);
	if (matches !== null) {
		matches.shift();
		const days = matches[0];
		const hours = matches[1];
		const minutes = matches[2];
		const seconds = matches[3];

		if (days) {
			future.add(parseInt(days),'days');
		}
		if (hours) {
			future.add(parseInt(hours),'hours');
		}
		if (minutes) {
			future.add(parseInt(minutes), 'minutes');
		}
		if (seconds) {
			future.add(parseInt(seconds), 'seconds');
		}

		return future.toDate();
	}

	return null;
};

module.exports = parseDateString;
