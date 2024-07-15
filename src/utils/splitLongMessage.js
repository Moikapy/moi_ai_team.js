// src/utils/splitLongMessages.js
export function splitLongMessage(message, maxLength = 1048576) {
  const chunks = [];
  let currentIndex = 0;

  while (currentIndex < message.length) {
    chunks.push(message.slice(currentIndex, currentIndex + maxLength));
    currentIndex += maxLength;
  }

  return chunks;
}
