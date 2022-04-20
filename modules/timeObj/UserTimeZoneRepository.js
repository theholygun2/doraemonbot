function UserTimeZoneRepository() {
	this.userTimeZoneMap = {};
}
/**
 *
 * @param {number} userId
 * @param {?string} timeZone
 */
UserTimeZoneRepository.prototype.setUserTimeZone = function(userId,timeZone) {
	this.userTimeZoneMap[userId] = timeZone;
};

/**
 *
 * @param {number} userId
 * @return {?string}
 */
UserTimeZoneRepository.prototype.getUserTimeZone = function(userId) {
	return this.userTimeZoneMap[userId];
};

/**
 *
 * @param {number} userId
 */
UserTimeZoneRepository.prototype.deleteUserTimeZone = function(userId) {
	delete this.userTimeZoneMap[userId];
};

UserTimeZoneRepository.prototype.clearUserTimeZones = function() {
	this.userTimeZoneMap = {};
};

const userTimeZoneRepository = new UserTimeZoneRepository();
module.exports = userTimeZoneRepository;
