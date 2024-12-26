import { useState, useEffect } from 'react';
import axios from 'axios';


const CLIENT_ID = 'cismqyqs02m9qugbgr591h0wuqhi2l';
const AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=http://localhost:5173&response_type=code&scope=user:read:email`;

interface User {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
}

export function useTwitchAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetchToken(code);
      window.history.replaceState(null, '', window.location.pathname); // Clean the URL
    } else {
      setLoading(false);
    }
  }, []);

  const fetchToken = async (code: string) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/token', { code });
      const { access_token } = response.data;
      console.log('Access token:', access_token);
      localStorage.setItem('twitch_token', access_token);
      fetchUserInfo(access_token);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const fetchUserInfo = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:3000/auth/user', {
        headers: { access_token: token },
      });
      setUser(response.data.data[0]);
      console.log("user" , user)
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    window.location.href = AUTH_URL;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('twitch_token');
  };

  return { user, loading, login, logout };
}
