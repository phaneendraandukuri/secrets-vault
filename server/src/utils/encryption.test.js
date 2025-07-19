describe('encrypt/decrypt with mocked env before import', () => {
  let encrypt, decrypt;

  beforeAll(() => {
    process.env.ENCRYPTION_KEY = '5d55373e3ee1e8a7d7be77f2a8d13wq4';
    const cryptoUtils = require('./encryption');
    encrypt = cryptoUtils.encrypt;
    decrypt = cryptoUtils.decrypt;
  });

  test('encrypt returns a salt:encryptedText format', () => {
    const result = encrypt('test message');
    expect(typeof result).toBe('string');
    expect(result).toContain(':');

    const [salt, encrypted] = result.split(':');
    expect(salt).toHaveLength(32);
    expect(/^[0-9a-f]+$/.test(salt)).toBe(true);
    expect(/^[0-9a-f]+$/.test(encrypted)).toBe(true);
  });

  test('encrypt and decrypt return the original string', () => {
    const text = 'very secret data';
    const encrypted = encrypt(text);
    const decrypted = decrypt(encrypted);
    expect(decrypted).toBe(text);
  });

  test('encrypting the same text twice produces different outputs but decrypts to the same original', () => {
    const encrypted1 = encrypt('repeatable input');
    const encrypted2 = encrypt('repeatable input');
    expect(encrypted1).not.toBe(encrypted2);

    const decrypted1 = decrypt(encrypted1);
    const decrypted2 = decrypt(encrypted2);
    expect(decrypted1).toBe(decrypted2);
  });
});
