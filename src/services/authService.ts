
// This is a mock authentication service

interface User {
  username: string;
  email: string;
  password: string;
}

// In-memory user storage for demonstration
const users: User[] = [];

export const authService = {
  login: (username: string, email: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // For demo purposes, find user with matching credentials
      const user = users.find(u => 
        (u.username === username || u.email === email) && 
        u.password === password
      );
      
      if (user) {
        // Simulate API delay
        setTimeout(() => {
          resolve(user.username);
        }, 1000);
      } else {
        // Check if we should auto-login for demo
        if (users.length === 0) {
          setTimeout(() => {
            resolve(username);
          }, 1000);
        } else {
          setTimeout(() => {
            reject(new Error("Invalid credentials"));
          }, 1000);
        }
      }
    });
  },
  
  register: (username: string, email: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Check if username or email already exists
      if (users.some(u => u.username === username)) {
        setTimeout(() => {
          reject(new Error("Username already exists"));
        }, 1000);
        return;
      }
      
      if (users.some(u => u.email === email)) {
        setTimeout(() => {
          reject(new Error("Email already exists"));
        }, 1000);
        return;
      }
      
      // Add new user
      users.push({ username, email, password });
      
      // Simulate API delay
      setTimeout(() => {
        resolve(username);
      }, 1500);
    });
  }
};
