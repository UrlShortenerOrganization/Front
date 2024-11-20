import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import URLShortener from './App';

// Mock the global fetch function
global.fetch = jest.fn();

describe('URLShortener', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders input and button', () => {
    render(
      <MemoryRouter>
        <URLShortener />
      </MemoryRouter>
    );
    
    expect(screen.getByPlaceholderText('Enter the link here')).toBeInTheDocument();
    expect(screen.getByText('Shorten URL')).toBeInTheDocument();
  });

  test('handles input change', () => {
    render(
      <MemoryRouter>
        <URLShortener />
      </MemoryRouter>
    );
    
    const input = screen.getByPlaceholderText('Enter the link here');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    
    expect(input.value).toBe('https://example.com');
  });

  test('handles valid URL shortening', async () => {
    // Mock successful fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('shortcode123')
    });

    render(
      <MemoryRouter>
        <URLShortener />
      </MemoryRouter>
    );
    
    const input = screen.getByPlaceholderText('Enter the link here');
    const button = screen.getByText('Shorten URL');
    
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/http:\/\/localhost:5299\/shortcode123/)).toBeInTheDocument();
    });
  });

  test('navigates to invalid link page for invalid URL', async () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <URLShortener />
      </Router>
    );
    
    const input = screen.getByPlaceholderText('Enter the link here');
    const button = screen.getByText('Shorten URL');
    
    fireEvent.change(input, { target: { value: 'invalid-url' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/invalid-link');
    });
  });

  test('handles copy URL', async () => {
    // Mock clipboard API
    const mockClipboard = {
      writeText: jest.fn().mockResolvedValue(undefined)
    };
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      configurable: true
    });

    render(
      <MemoryRouter>
        <URLShortener />
      </MemoryRouter>
    );
    
    // First shorten a URL
    fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('shortcode123')
    });

    const input = screen.getByPlaceholderText('Enter the link here');
    const button = screen.getByText('Shorten URL');
    
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(button);

    // Then try to copy
    await waitFor(() => {
      const copyableUrl = screen.getByText(/http:\/\/localhost:5299\/shortcode123/);
      fireEvent.click(copyableUrl);
    });

    await waitFor(() => {
      expect(mockClipboard.writeText).toHaveBeenCalled();
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });
});