const BUSINESS_HOURS = {
  tuesday: { open: '16:00', close: '20:00' },
  wednesday: { open: '16:00', close: '20:00' },
  thursday: { open: '16:00', close: '20:00' },
  friday: { open: '16:00', close: '20:00' },
  saturday: { open: '10:00', close: '15:00' },
  sunday: { open: '10:00', close: '15:00' }
};

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function formatDay(dayName, isToday) {
  return isToday ? 'today' : dayName.charAt(0).toUpperCase() + dayName.slice(1);
}

export function getNextOpeningTime() {
  const now = new Date();
  const currentDay = DAYS[now.getDay()];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  // Check if we're currently open
  if (BUSINESS_HOURS[currentDay]) {
    const { open, close } = BUSINESS_HOURS[currentDay];
    const openMinutes = timeToMinutes(open);
    const closeMinutes = timeToMinutes(close);
    
    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      return {
        status: 'open',
        until: close
      };
    }

    // If we haven't opened yet today
    if (currentMinutes < openMinutes) {
      return {
        status: 'closed',
        nextOpen: {
          day: formatDay(currentDay, true),
          time: open
        }
      };
    }
  }

  // Find next opening time starting from tomorrow
  let daysToAdd = 1;
  while (daysToAdd <= 7) {
    const nextDayIndex = (now.getDay() + daysToAdd) % 7;
    const nextDay = DAYS[nextDayIndex];
    
    if (BUSINESS_HOURS[nextDay]) {
      return {
        status: 'closed',
        nextOpen: {
          day: formatDay(nextDay, false),
          time: BUSINESS_HOURS[nextDay].open
        }
      };
    }
    daysToAdd++;
  }

  return null;
}

export function formatTime(time) {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
} 