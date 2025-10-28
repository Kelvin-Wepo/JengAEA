import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set up axios defaults
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
  }, [state.token]);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      // Verify token and get user data
      verifyToken();
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const verifyToken = async () => {
    try {
      const response = await axios.get('/api/auth/dashboard/');
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: localStorage.getItem('token'),
        },
      });
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await axios.post('/api/auth/login/', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });
      
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      const message = error.response?.data?.message || error.response?.data?.error || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      // Set up headers
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      // Try simple registration first for debugging
      console.log('Attempting simple registration first...');
      const testResponse = await axios.post('/api/auth/simple-register/', userData, { headers });
      console.log('Simple registration response:', testResponse.data);

      // If simple registration works, try the main registration
      const response = await axios.post('/api/auth/register/', userData, { headers });
      
      // Check if backend returned success flag
      if (response.data.success) {
        toast.success(response.data.message || 'Registration successful! Please verify your phone number.');
        return { 
          success: true, 
          data: response.data.data 
        };
      } else {
        const errorMsg = response.data.message || 'Registration failed';
        toast.error(errorMsg);
        return { 
          success: false, 
          error: errorMsg 
        };
      }
    } catch (error) {
      console.error('Registration error:', error.response || error);
      // Extract error messages from Django response
      let message = 'Registration failed';
      let errorDetails = {};
      
      if (error.response?.data) {
        if (error.response.data.errors) {
          // Format validation errors
          const errors = error.response.data.errors;
          errorDetails = errors;
          
          const errorMessages = Object.entries(errors).map(([field, msgs]) => {
            const msgArray = Array.isArray(msgs) ? msgs : [msgs];
            return `${field}: ${msgArray.join(', ')}`;
          });
          message = errorMessages.join('\n');
        } else if (error.response.data.message) {
          message = error.response.data.message;
        } else if (error.response.data.error) {
          message = error.response.data.error;
        }
      }
      
      toast.error(message);
      return { 
        success: false, 
        error: message, 
        errors: errorDetails 
      };
    }
  };

  const sendOTP = async (phoneNumber) => {
    try {
      const response = await axios.post('/api/auth/send-otp/', {
        phone_number: phoneNumber,
      });
      
      if (response.data.success) {
        toast.success(response.data.message || 'OTP sent successfully!');
        return { success: true, data: response.data };
      } else {
        const message = response.data.message || 'Failed to send OTP';
        toast.error(message);
        return { success: false, error: message };
      }
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Failed to send OTP';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const verifyOTP = async (phoneNumber, otpCode) => {
    try {
      const response = await axios.post('/api/auth/verify-otp/', {
        phone_number: phoneNumber,
        otp_code: otpCode,
      });
      
      if (response.data.success) {
        toast.success(response.data.message || 'Phone number verified successfully!');
        return { success: true, data: response.data };
      } else {
        const message = response.data.message || 'OTP verification failed';
        toast.error(message);
        return { success: false, error: message };
      }
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'OTP verification failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      dispatch({ type: 'LOGOUT' });
      toast.success('Logged out successfully!');
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.patch('/api/auth/profile/', profileData);
      dispatch({ type: 'UPDATE_USER', payload: response.data });
      toast.success('Profile updated successfully!');
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Profile update failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const value = {
    ...state,
    login,
    register,
    sendOTP,
    verifyOTP,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};