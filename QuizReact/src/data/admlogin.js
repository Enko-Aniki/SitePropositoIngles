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

// Function to authenticate user
export const authenticateUser = (emailOrUsername, password) => {
  const user = users.find(
    u => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
  );
  
  if (user) {
    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
};
