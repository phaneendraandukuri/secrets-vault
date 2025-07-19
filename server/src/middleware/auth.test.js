const jwt = require('jsonwebtoken');
const auth = require('./auth');

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      header: jest.fn(),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test('should return 401 if no Authorization header is provided', async () => {
    req.header.mockReturnValue(undefined);

    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authentication required' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 401 if token is invalid', async () => {
    req.header.mockReturnValue('Bearer invalid.token');
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should set req.user and call next for valid token', async () => {
    const token = 'valid.token';
    req.header.mockReturnValue(`Bearer ${token}`);

    jwt.verify.mockReturnValue({ userId: 'user123' });

    await auth(req, res, next);

    expect(req.user).toEqual({ id: 'user123' });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
