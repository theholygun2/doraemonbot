function TimerMetaData() {
	/**
	 * @private
	 * @type {?number}
	 */
	this.discordGuildId = null;
	/**
	 * @private
	 * @type {?number}
	 */
	this.jobId = null;
	/**
	 * @private
	 * @type {?Date}
	 */
	this.date = null;
	/**
	 * @private
	 * @type {?string}
	 */
	this.description = null;
	/**
	 * @private
	 * @type {?string}
	 */
	this.userOrRoleToNotify = null;
	/**
	 * @private
	 * @type {?number}
	 */
	this.userOrRoleIdToNotify = null;
	/**
	 * @private
	 * @type {?Object}
	 */
	this.scheduledJob = null;

	this.setDiscordGuildId = function(guildId) {
		this.discordGuildId = guildId;
	}.bind(this);

	this.getDiscordGuildId = function() {
		return this.discordGuildId;
	}.bind(this);

	this.setJobId = function(jobId) {
		this.jobId = jobId;
	}.bind(this);

	this.getJobId = function() {
		return this.jobId;
	}.bind(this);

	this.setDate = function(date) {
		this.date = date;
	}.bind(this);

	this.getDate = function() {
		return this.date;
	}.bind(this);

	this.setDescription = function(description) {
		this.description = description;
	}.bind(this);

	this.getDescription = function() {
		return this.description;
	}.bind(this);

	this.setUserOrRoleToNotify = function(userOrRoleToNotify) {
		this.userOrRoleToNotify = userOrRoleToNotify;
	}.bind(this);

	this.getUserOrRoleToNotify = function() {
		return this.userOrRoleToNotify;
	}.bind(this);

	this.setUserOrRoleIdToNotify = function(userOrRoleIdToNotify) {
		this.userOrRoleIdToNotify = userOrRoleIdToNotify;
	}.bind(this);

	this.getUserOrRoleIdToNotify = function() {
		return this.userOrRoleIdToNotify;
	}.bind(this);

	this.setScheduledJob = function(scheduledJob) {
		this.scheduledJob = scheduledJob;
	}.bind(this);

	this.getScheduledJob = function() {
		return this.scheduledJob;
	}.bind(this);
}

module.exports = TimerMetaData;
