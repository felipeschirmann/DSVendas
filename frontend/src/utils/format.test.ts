import { round, formatLocalDate } from './format';

describe('format utils', () => {
  test('round rounds numbers correctly', () => {
    expect(round(10.1234, 2)).toBe(10.12);
    expect(round(10.1278, 2)).toBe(10.13);
    expect(round(10.5, 0)).toBe(11);
  });

  test('formatLocalDate formats ISO date string correctly', () => {
    const formatted = formatLocalDate('2026-06-13T12:00:00Z', 'dd/MM/yyyy');
    expect(formatted).toBe('13/06/2026');
  });
});
