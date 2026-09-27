const isMatch = (requestA, requestB) => {
  if (requestA.trainNumber !== requestB.trainNumber) {
    return false;
  }

  if (
    new Date(requestA.journeyDate).getTime() !==
    new Date(requestB.journeyDate).getTime()
  ) {
    return false;
  }

  if (
  requestA.currentSeat !== requestB.desiredSeat ||
  requestA.currentSeatType.toLowerCase() !==
    requestB.desiredSeatType.toLowerCase()
) {
  return false;
}

if (
  requestA.desiredSeat !== requestB.currentSeat ||
  requestA.desiredSeatType.toLowerCase() !==
    requestB.currentSeatType.toLowerCase()
) {
  return false;
}

  return true;
};

module.exports = isMatch;