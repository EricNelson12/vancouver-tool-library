import { getNextOpeningTime, formatTime } from './businessHours';

describe('Business Hours Logic', () => {
  let originalDate;

  beforeEach(() => {
    originalDate = global.Date;
  });

  afterEach(() => {
    global.Date = originalDate;
  });

  test('should show open status during business hours', () => {
    const mockDate = new Date(2024, 2, 15, 16, 0); // Friday March 15, 2024 at 4:00 PM
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
    };

    const status = getNextOpeningTime();
    expect(status).toEqual({
      status: 'open',
      until: '20:00'
    });
  });

  test('should show closed status before opening with "today"', () => {
    const mockDate = new Date(2024, 2, 15, 15, 0); // Friday March 15, 2024 at 3:00 PM
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
    };

    const status = getNextOpeningTime();
    expect(status).toEqual({
      status: 'closed',
      nextOpen: {
        day: 'today',
        time: '16:00'
      }
    });
  });

  test('should show closed status after closing', () => {
    const mockDate = new Date(2024, 2, 15, 21, 0); // Friday March 15, 2024 at 9:00 PM
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
    };

    const status = getNextOpeningTime();
    expect(status).toEqual({
      status: 'closed',
      nextOpen: {
        day: 'Saturday',
        time: '10:00'
      }
    });
  });

  test('should show next opening on Monday', () => {
    const mockDate = new Date(2024, 2, 18, 12, 0); // Monday March 18, 2024 at 12:00 PM
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
    };

    const status = getNextOpeningTime();
    expect(status).toEqual({
      status: 'closed',
      nextOpen: {
        day: 'Tuesday',
        time: '16:00'
      }
    });
  });

  test('should format time correctly', () => {
    expect(formatTime('16:00')).toBe('4:00 PM');
    expect(formatTime('10:00')).toBe('10:00 AM');
    expect(formatTime('20:00')).toBe('8:00 PM');
  });
}); 