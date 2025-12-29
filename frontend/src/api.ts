import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const numericalAPI = {
  bisection: async (data: {
    function: string;
    a: number;
    b: number;
    tolerance?: number;
  }) => {
    const response = await axios.post(`${API_BASE_URL}/bisection/`, data);
    return response.data;
  },

  newtonRaphson: async (data: {
    function: string;
    x0: number;
    tolerance?: number;
  }) => {
    const response = await axios.post(`${API_BASE_URL}/newton-raphson/`, data);
    return response.data;
  },

  finiteDifferences: async (data: {
    x_values: number[];
    y_values: number[];
    type: 'forward' | 'backward' | 'central';
    h?: number;
  }) => {
    const response = await axios.post(`${API_BASE_URL}/finite-differences/`, data);
    return response.data;
  },

  errorCalculation: async (data: {
    true_value: number;
    approximate_value: number;
  }) => {
    const response = await axios.post(`${API_BASE_URL}/error-calculation/`, data);
    return response.data;
  },

  newtonForwardDiff: async (data: {
    x_values: number[];
    y_values: number[];
    x_target: number;
  }) => {
    const response = await axios.post(`${API_BASE_URL}/newton-forward-diff/`, data);
    return response.data;
  },
};
