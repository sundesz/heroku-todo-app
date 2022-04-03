import { NextFunction, RequestHandler, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { COOKIE_EXPIRE_TIME, SECRET_KEY } from '../../config';
import { Task, User } from '../../db/models';

/**
 * Find one user by username
 * @param username string
 * @returns User | null
 */
const getUser = async (username: string) => {
  return await User.findOne({
    where: { username },
    attributes: ['userId', 'name', 'username', 'passwordHash'],
    include: {
      model: Task,
      attributes: ['taskId', 'content', 'isCompleted', 'important'],
    },
    order: [[Task, 'createdAt', 'asc']],
  });
};

/**
 * Generates token for frontend users
 * @param user
 * @returns generateToken
 */
const generateToken = (user: User) => {
  if (user === null) {
    throw new Error('User not found');
  }

  const userForToken = {
    name: user.name,
    username: user.username,
    id: user.userId,
  };

  return jwt.sign(userForToken, SECRET_KEY, {
    expiresIn: COOKIE_EXPIRE_TIME,
  });
};

/**
 * Login request handler
 */
const login: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    if (!username || !password) {
      throw new Error('Invalid username or password');
    }

    const user = await getUser(username);
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      throw new Error('Invalid username or password');
    }

    loginAndRefreshTokenResponse(res, user);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Refresh token when frontend refresh the browser
 */
const refreshToken: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { username } = req.decodedToken as { username: string };
    const user = await getUser(username);

    if (user) {
      loginAndRefreshTokenResponse(res, user);
    }
  } catch (error) {
    res.status(200).end();
    next(error);
  }
};

/**
 * Logout handler
 */
const logout: RequestHandler = (_req, res) => {
  res.setHeader('Set-Cookie', '');
  res.clearCookie('auth');
  res.status(204).end();
};

const loginAndRefreshTokenResponse = (res: Response, user: User) => {
  const token = generateToken(user);

  return res
    .setHeader(
      'Set-Cookie',
      cookie.serialize('auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: COOKIE_EXPIRE_TIME,
        path: '/',
      })
    )
    .status(200)
    .json({
      name: user.name,
      username: user.username,
      tasks: user.tasks,
    });
};

export default {
  login,
  logout,
  refreshToken,
};
