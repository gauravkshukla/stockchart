import React from 'react';
import { render, screen, fireEvent, within  } from '@testing-library/react';
import PriceSelector from './PriceSelector';

describe('PriceSelector', () => {
  it('calls priceRange with selected value when an option is selected', async () => {
    const mockPriceRange = jest.fn();
    render(<PriceSelector priceRange={mockPriceRange} />);

    const select1 = await screen.getByRole('button');
    fireEvent.mouseDown(select1);
    const select2 = await screen.getByRole('listbox');
    fireEvent.click(
      within(select2).getByText('High')
    );
    expect(mockPriceRange).toHaveBeenCalledWith('h');
  });
});
