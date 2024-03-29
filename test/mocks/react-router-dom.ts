import React from 'react';

export const useLocation = jest.fn(() => ({
  state: 'user@example.com',
}));

export const useNavigate = jest.fn();