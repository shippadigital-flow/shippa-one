// Small test to exercise the session abstraction (minimal smoke test)
import { readSession, writeSession, clearSession, buildSessionUser } from '@/lib/session';

describe('session abstraction smoke', () => {
  it('can write then read then clear session (jsdom)', () => {
    const user = buildSessionUser('test@example.com', 'Test User');
    writeSession(user);
    const read = readSession();
    if (!read) throw new Error('expected session after write');
    expect(read.email).toBe('test@example.com');
    clearSession();
    expect(readSession()).toBeNull();
  });
});
