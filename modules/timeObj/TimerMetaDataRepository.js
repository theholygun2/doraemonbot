function TimerMetaDataRepository() {
	this.timerObjectsMapByGuildId = {};
}
/**
 * @typedef TimerMetaData
 * @property {?number} jobId
 * @property {?Date} date
 * @property {?string} description
 * @property {?string} userOrRoleToNotify
 * @property {?number} userOrRoleIdToNotify
 * @property {?Object} scheduledJob
 */

/**
 * @param {number} guildId
 * @param {TimerMetaData} timerMetaData
 */
TimerMetaDataRepository.prototype.addTimerMetadata = function(guildId, timerMetaData) {
	if (!timerMetaData) {
		return;
	}

	this.timerObjectsMapByGuildId[guildId] = this.timerObjectsMapByGuildId[guildId] || {};
	this.timerObjectsMapByGuildId[guildId][timerMetaData.jobId] = timerMetaData;
};
/**
 * @param {number} guildId
 * @param {number} jobId
 */
TimerMetaDataRepository.prototype.deleteTimerMetadata = function(guildId,jobId) {
	delete this.timerObjectsMapByGuildId[guildId][jobId];
};

/**
 *
 * @return {TimerMetaData[]}
 */
TimerMetaDataRepository.prototype.getAllTimerMetadata = function(guildId) {
	return Object.values(this.timerObjectsMapByGuildId[guildId] || {});
};

const timerMetaDataRepository = new TimerMetaDataRepository();

module.exports = timerMetaDataRepository;
