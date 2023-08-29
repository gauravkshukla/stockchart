import React from 'react';
import '../setupTests';
import { render, screen, fireEvent, waitFor, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import Main from './Main';
import axios from 'axios';
import { fetchPriceList } from '../service/ApiConfig';

jest.mock('axios'); // Mock axios


describe('useMainEffect', () => {
  const stocksList = [{displaySymbol:'AAPL'}, {displaySymbol: 'GOOGL'}];
  const price = "h";
  const dateRange = ['2023-08-01', '2023-08-02'];

  it('renders the Show Chart button', () => {
    render(<Main stocksList={stocksList} price={price} dateRange={dateRange} />);
    const showChartButton = screen.getByRole('button', { name: /show chart/i });
    expect(showChartButton).toBeInTheDocument();
  });

  // API fetches successfully
  it('fetches successfully data from an API', async () => {
    const mockData = [{ displaySymbol: 'AAPL' },{ displaySymbol: 'GOOGL' }];

  // Mock the global fetch function
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const data = await fetchPriceList(stocksList);
    
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(expect.anything()); // You can also check the URL
  });

  // Error while API fetch
  it('throws an error when the API call fails', async () => {
    const mockError = new Error('Request failed');

    // Mock the global fetch function
    global.fetch = jest.fn().mockRejectedValue(mockError);

    try {
      await fetchPriceList(stocksList);
    } catch (error) {
      expect(error).toEqual(mockError);
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith(expect.anything()); // You can also check the URL
    }
  });
});

// const mockPriceList = [{ name: 'AAPL',symbol:'AAPL',currency:'USD'  },{ name: 'GOOGL',symbol:'GOOGL',currency:'USD'  }];
