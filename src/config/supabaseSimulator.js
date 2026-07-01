// Supabase Client Simulator
// This file mimics the Supabase Auth API signature so that the official `@supabase/supabase-js` 
// client can be plugged in later by simply changing the import in AuthContext.

const USERS_KEY = 'nexoresha_sim_users';
const SESSION_KEY = 'nexoresha_sim_session';

// Helper to get users from localStorage
const getStoredUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Helper to save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Helper to get active session
const getStoredSession = () => {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

// Helper to save active session
const saveSession = (session) => {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
};

// Array of listeners for auth state changes
let authStateListeners = [];

// Helper to notify listeners of auth changes
const notifyListeners = (event, session) => {
  authStateListeners.forEach((listener) => {
    try {
      listener(event, session);
    } catch (e) {
      console.error("Error in auth state listener:", e);
    }
  });
};

// Generate UUID-like strings
const generateUUID = () => {
  return 'usr_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const supabaseSimulator = {
  auth: {
    // 1. Sign Up
    signUp: async ({ email, password, options }) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      if (!email || !password) {
        return {
          data: { user: null, session: null },
          error: { message: "Email and password are required" }
        };
      }

      const users = getStoredUsers();
      const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

      if (userExists) {
        return {
          data: { user: null, session: null },
          error: { message: "User already registered" }
        };
      }

      const userId = generateUUID();
      const fullName = options?.data?.full_name || email.split('@')[0];
      
      const newUser = {
        id: userId,
        email: email.toLowerCase(),
        // Simple client-side hash simulation for security in local storage
        password: btoa(password), 
        user_metadata: {
          full_name: fullName,
          avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`
        },
        created_at: new Date().toISOString(),
      };

      // Add to mock DB
      users.push(newUser);
      saveUsers(users);

      // Create session
      const session = {
        access_token: 'tok_' + Math.random().toString(36).substring(2, 15),
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'ref_' + Math.random().toString(36).substring(2, 15),
        user: {
          id: newUser.id,
          email: newUser.email,
          user_metadata: newUser.user_metadata,
          created_at: newUser.created_at
        }
      };

      saveSession(session);
      notifyListeners('SIGNED_IN', session);

      return {
        data: {
          user: session.user,
          session
        },
        error: null
      };
    },

    // 2. Sign In with Password
    signInWithPassword: async ({ email, password }) => {
      await new Promise(resolve => setTimeout(resolve, 800));

      if (!email || !password) {
        return {
          data: { user: null, session: null },
          error: { message: "Email and password are required" }
        };
      }

      const users = getStoredUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!user || user.password !== btoa(password)) {
        return {
          data: { user: null, session: null },
          error: { message: "Invalid login credentials" }
        };
      }

      // Create session
      const session = {
        access_token: 'tok_' + Math.random().toString(36).substring(2, 15),
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'ref_' + Math.random().toString(36).substring(2, 15),
        user: {
          id: user.id,
          email: user.email,
          user_metadata: user.user_metadata,
          created_at: user.created_at
        }
      };

      saveSession(session);
      notifyListeners('SIGNED_IN', session);

      return {
        data: {
          user: session.user,
          session
        },
        error: null
      };
    },

    // 3. Sign Out
    signOut: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      saveSession(null);
      notifyListeners('SIGNED_OUT', null);
      return { error: null };
    },

    // 4. Get Current Session
    getSession: async () => {
      const session = getStoredSession();
      return {
        data: { session },
        error: null
      };
    },

    // 5. Get Current User Info
    getUser: async () => {
      const session = getStoredSession();
      return {
        data: { user: session ? session.user : null },
        error: null
      };
    },

    // 6. Reset Password Link
    resetPasswordForEmail: async (email, options = {}) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!email) {
        return {
          data: null,
          error: { message: "Email is required" }
        };
      }

      // Just simulate sending password reset email
      console.log(`[Supabase Simulator] Password reset link requested for: ${email}`);
      return {
        data: {},
        error: null
      };
    },

    // 7. Update User Meta/Password
    updateUser: async (attributes) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const session = getStoredSession();
      if (!session) {
        return {
          data: { user: null },
          error: { message: "Not authenticated" }
        };
      }

      const users = getStoredUsers();
      const userIndex = users.findIndex(u => u.id === session.user.id);

      if (userIndex === -1) {
        return {
          data: { user: null },
          error: { message: "User not found" }
        };
      }

      // Update password if provided
      if (attributes.password) {
        users[userIndex].password = btoa(attributes.password);
      }

      // Update user metadata if provided
      if (attributes.data) {
        users[userIndex].user_metadata = {
          ...users[userIndex].user_metadata,
          ...attributes.data
        };
      }

      saveUsers(users);

      // Update session
      session.user.user_metadata = users[userIndex].user_metadata;
      saveSession(session);
      
      notifyListeners('USER_UPDATED', session);

      return {
        data: { user: session.user },
        error: null
      };
    },

    // 8. OAuth Login (Continue with Google)
    signInWithOAuth: async ({ provider, options }) => {
      // Simulate delay for redirection
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (provider !== 'google') {
        return {
          data: null,
          error: { message: `OAuth provider ${provider} not supported by simulator` }
        };
      }

      // Simulate successful OAuth sign in
      const email = 'google.user@example.com';
      const fullName = 'Creative Partner';
      
      const users = getStoredUsers();
      let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        user = {
          id: generateUUID(),
          email: email.toLowerCase(),
          password: btoa('google_oauth_bypass_pass'),
          user_metadata: {
            full_name: fullName,
            avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`
          },
          created_at: new Date().toISOString()
        };
        users.push(user);
        saveUsers(users);
      }

      const session = {
        access_token: 'tok_google_' + Math.random().toString(36).substring(2, 15),
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'ref_google_' + Math.random().toString(36).substring(2, 15),
        user: {
          id: user.id,
          email: user.email,
          user_metadata: user.user_metadata,
          created_at: user.created_at
        }
      };

      saveSession(session);
      notifyListeners('SIGNED_IN', session);

      // In a real OAuth flow, Supabase redirects. Here we return data immediately.
      return {
        data: {
          provider: 'google',
          url: window.location.origin + '/dashboard'
        },
        error: null
      };
    },

    // 9. Register Change Listeners
    onAuthStateChange: (callback) => {
      authStateListeners.push(callback);
      
      // Instantly trigger with current state as per Supabase spec
      const session = getStoredSession();
      const event = session ? 'SIGNED_IN' : 'INITIAL_SESSION';
      callback(event, session);

      return {
        data: {
          subscription: {
            unsubscribe: () => {
              authStateListeners = authStateListeners.filter(l => l !== callback);
            }
          }
        }
      };
    }
  },
  from: (tableName) => {
    return {
      insert: async (rows) => {
        await new Promise(resolve => setTimeout(resolve, 600));
        console.log(`[Supabase Simulator DB] Inserted into ${tableName}:`, rows);
        try {
          const storageKey = `nexoresha_sim_db_${tableName}`;
          const existingData = localStorage.getItem(storageKey);
          const dbData = existingData ? JSON.parse(existingData) : [];
          const newRows = rows.map(r => ({ 
            ...r, 
            id: 'row_' + Math.random().toString(36).substring(2, 15) 
          }));
          dbData.push(...newRows);
          localStorage.setItem(storageKey, JSON.stringify(dbData));
          return { data: newRows, error: null };
        } catch (e) {
          console.error("Simulator database error:", e);
          return { data: null, error: { message: e.message } };
        }
      }
    };
  }
};
