const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

const encrypt = (text) => {
  const salt = crypto.randomBytes(16).toString('hex');

  const cipher = crypto.createCipheriv(
    'aes-256-ctr',
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(salt, 'hex').slice(0, 16)
  );

  const encrypted = Buffer.concat([
    cipher.update(text),
    cipher.final()
  ]);

  return `${salt}:${encrypted.toString('hex')}`;
};

const decrypt = (encryptedText) => {
  const [salt, encrypted] = encryptedText.split(':');

  const decipher = crypto.createDecipheriv(
    'aes-256-ctr',
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(salt, 'hex').slice(0, 16)
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted, 'hex')),
    decipher.final()
  ]);

  return decrypted.toString();
};

module.exports = { encrypt, decrypt };