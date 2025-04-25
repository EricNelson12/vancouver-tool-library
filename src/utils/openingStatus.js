import { getNextOpeningTime, formatTime } from './businessHours.js';

export function updateOpeningStatus() {
  const status = getNextOpeningTime();
  const banner = document.getElementById('opening-status-banner');
  
  if (!banner) return;
  
  if (status) {
    if (status.status === 'open') {
      banner.textContent = `We are currently open until ${formatTime(status.until)}`;
    } else {
      banner.textContent = `Next opening: ${status.nextOpen.day} at ${formatTime(status.nextOpen.time)}`;
    }
  } else {
    banner.textContent = 'Opening hours information unavailable';
  }
} 