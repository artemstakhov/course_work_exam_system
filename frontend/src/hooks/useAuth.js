import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = Cookies.get('token');
        
        if (!token) {
          setUser(null);
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const decoded = decodeToken(token);
        
        if (!decoded || !decoded._id) {
          // Token invalid
          Cookies.remove('token');
          setUser(null);
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Check if token is expired
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          Cookies.remove('token');
          setUser(null);
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setUser(decoded);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        Cookies.remove('token');
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuth();

    // Recheck on cookie changes (polling every 500ms)
    const interval = setInterval(checkAuth, 500);
    
    return () => clearInterval(interval);
  }, []);

  return { user, isAuthenticated, loading };
};
