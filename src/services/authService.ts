
// This is a mock authentication service

interface User {
  username: string;
  password: string;
}

// In-memory user storage for demonstration
const users: User[] = [];

export const authService = {
  login: (username: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // For demo purposes, find user with matching credentials
      const user = users.find(u => u.username === username && u.password === password);
      
      if (user) {
        // Simulate API delay
        setTimeout(() => {
          resolve(username);
        }, 1000);
      } else {
        // Check if we should auto-login for demo
        if (users.length === 0) {
          setTimeout(() => {
            resolve(username);
          }, 1000);
        } else {
          setTimeout(() => {
            reject(new Error("Invalid username or password"));
          }, 1000);
        }
      }
    });
  },
  
  register: (username: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Check if username already exists
      if (users.some(u => u.username === username)) {
        setTimeout(() => {
          reject(new Error("Username already exists"));
        }, 1000);
        return;
      }
      
      // Add new user
      users.push({ username, password });
      
      // Simulate API delay
      setTimeout(() => {
        resolve(username);
      }, 1500);
    });
  }
};
