/**
 * @type {number}
 */
 let jobId = 0;

 /**
  *
  * @return {number}
  */
 function getNextAvailableJobId() {
     return ++jobId;
 }
 
 module.exports = getNextAvailableJobId;
 