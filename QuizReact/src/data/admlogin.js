// Admin/User credentials - stored securely should be done server-side in production
export const users = [
  {
    id: 1,
    email: 'admin@email.com',
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 2,
    email: 'user@email.com',
    username: 'user',
    password: 'user123',
    role: 'user'
  }
];

const REGISTERED_USERS_KEY = 'registeredUsers';

export const getRegisteredUsers = () => {
  const storedUsers = localStorage.getItem(REGISTERED_USERS_KEY);
  if (!storedUsers) return [];

  const parsedUsers = JSON.parse(storedUsers);
  if (!Array.isArray(parsedUsers)) {
    throw new Error('Os dados das contas cadastradas estão em um formato inválido.');
  }

  return parsedUsers;
};

export const persistRegisteredUserProfile = (profile) => {
  if (!profile?.id) return;

  const registeredUsers = getRegisteredUsers();
  const userIndex = registeredUsers.findIndex((user) => user.id === profile.id);
  if (userIndex === -1) return;

  const updatedUsers = [...registeredUsers];
  updatedUsers[userIndex] = {
    ...updatedUsers[userIndex],
    avatar: profile.avatar,
    totalScore: Number(profile.totalScore) || 0,
    quizHistory: Array.isArray(profile.quizHistory) ? profile.quizHistory : [],
  };

  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updatedUsers));
};

export const createUserAccount = (username, password) => {
  const normalizedUsername = username.trim();
  if (!normalizedUsername || !password) {
    throw new Error('Informe um nome de usuário e uma senha.');
  }

  const registeredUsers = getRegisteredUsers();
  const usernameExists = [...users, ...registeredUsers].some(
    (user) => user.username.toLowerCase() === normalizedUsername.toLowerCase()
  );
  if (usernameExists) {
    throw new Error('Já existe uma conta com esse nome de usuário.');
  }

  const newUser = {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    username: normalizedUsername,
    password,
    role: 'user',
    totalScore: 0,
    quizHistory: [],
  };

  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([...registeredUsers, newUser]));
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Function to authenticate user
export const authenticateUser = (emailOrUsername, password) => {
  const user = [...users, ...getRegisteredUsers()].find(
    u => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
  );
  
  if (user) {
    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
};
