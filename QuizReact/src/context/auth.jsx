import React, { createContext, useState, useEffect, useCallback } from 'react';
import avatarA from '../img/usuariofotoA.jpg';
import avatarB from '../img/usuariofotoB.jpg';
import avatarC from '../img/usuariofotoC.jpg';
import avatarD from '../img/usuariofotoD.jpg';
import avatarE from '../img/usuariofotoE.jpg';
import avatarF from '../img/usuariofotoF.jpg';
import avatarG from '../img/usuariofotoG.jpg';
import { persistRegisteredUserProfile } from '../data/admlogin';

export const profileAvatarOptions = [
  { id: 'A', src: avatarA },
  { id: 'B', src: avatarB },
  { id: 'C', src: avatarC },
  { id: 'D', src: avatarD },
  { id: 'E', src: avatarE },
  { id: 'F', src: avatarF },
  { id: 'G', src: avatarG },
];

const normalizeUser = (userData) => {
  if (!userData) return null;

  const quizHistory = Array.isArray(userData.quizHistory)
    ? userData.quizHistory.map((attempt) => ({
        score: Number(attempt?.score) || 0,
        completedAt: attempt?.completedAt || Date.now(),
      }))
    : [];

  return {
    ...userData,
    avatar: userData.avatar || profileAvatarOptions[0].src,
    totalScore: Number(userData.totalScore) || 0,
    quizHistory,
  };
};

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return null;
      return normalizeUser(JSON.parse(storedUser));
    } catch (error) {
      console.error('Error parsing stored user:', error);
      localStorage.removeItem('user');
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = normalizeUser(JSON.parse(storedUser));
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const persistUser = useCallback((nextUser) => {
    const normalizedUser = normalizeUser(nextUser);
    setUser(normalizedUser);
    setIsAuthenticated(true);
    if (normalizedUser) {
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      persistRegisteredUserProfile(normalizedUser);
    }
    return normalizedUser;
  }, []);

  const login = useCallback((userData) => {
    const normalizedLoginUser = normalizeUser(userData || {});
    return persistUser({
      ...normalizedLoginUser,
      avatar: userData?.avatar || normalizedLoginUser?.avatar || profileAvatarOptions[0].src,
      totalScore: Number(userData?.totalScore) || 0,
      quizHistory: Array.isArray(userData?.quizHistory) ? userData.quizHistory : [],
    });
  }, [persistUser]);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  }, []);

  const updateUser = useCallback((partialUser) => {
    setUser((currentUser) => {
      const nextUser = normalizeUser({
        ...(currentUser || {}),
        ...(partialUser || {}),
      });

      if (nextUser) {
        localStorage.setItem('user', JSON.stringify(nextUser));
        persistRegisteredUserProfile(nextUser);
      }

      return nextUser;
    });
  }, []);

  const getQuizHistoryLast24h = useCallback(() => {
    if (!user?.quizHistory?.length) return [];

    const now = Date.now();
    return user.quizHistory.filter((attempt) => {
      const attemptTime = new Date(attempt.completedAt).getTime();
      return now - attemptTime <= 24 * 60 * 60 * 1000;
    });
  }, [user]);

  const canStartQuiz = useCallback(() => {
    return getQuizHistoryLast24h().length < 3;
  }, [getQuizHistoryLast24h]);

  const getQuizAvailabilityInfo = useCallback(() => {
    const attempts = getQuizHistoryLast24h();
    const limit = 3;

    if (attempts.length < limit) {
      return {
        canPlay: true,
        used: attempts.length,
        limit,
        nextAvailableInMs: 0,
      };
    }

    const oldestAttempt = [...attempts].sort(
      (a, b) => new Date(a.completedAt) - new Date(b.completedAt)
    )[0];
    const oldestTime = new Date(oldestAttempt.completedAt).getTime();
    const remainingLockMs = 24 * 60 * 60 * 1000 - (Date.now() - oldestTime);

    return {
      canPlay: false,
      used: attempts.length,
      limit,
      nextAvailableInMs: Math.max(remainingLockMs, 0),
    };
  }, [getQuizHistoryLast24h]);

  const registerQuizScore = useCallback((score) => {
    setUser((currentUser) => {
      const baseUser = normalizeUser(currentUser || user);
      if (!baseUser) return null;

      const nextUser = {
        ...baseUser,
        totalScore: (Number(baseUser.totalScore) || 0) + (Number(score) || 0),
        quizHistory: [
          ...(Array.isArray(baseUser.quizHistory) ? baseUser.quizHistory : []),
          {
            score: Number(score) || 0,
            completedAt: Date.now(),
          },
        ],
      };

      localStorage.setItem('user', JSON.stringify(nextUser));
      persistRegisteredUserProfile(nextUser);
      return nextUser;
    });
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        loading,
        updateUser,
        canStartQuiz,
        getQuizAvailabilityInfo,
        registerQuizScore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
