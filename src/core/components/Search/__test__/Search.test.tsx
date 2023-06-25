import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import Search from '../Search';
import SEARCH_TYPE from '../../../enum/searchType';

const initialValues = {
    text: '',
    type: SEARCH_TYPE.USER,
};
describe('Search', () => {
    test('should call onSubmit with correct data', async () => {
        const onSubmit = jest.fn();
        render(<Search onSubmit={onSubmit} initialValues={initialValues} />);

        fireEvent.change(screen.getByTestId('search-text'), { target: { value: 'test' } });

        fireEvent.click(screen.getByTestId('submit-btn'));

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith({
                text: 'test',
                type: SEARCH_TYPE.USER,
                page: 1,
            });
        });
    });
    test('should error text exist in document', async () => {
        const onSubmit = jest.fn();
        render(<Search onSubmit={onSubmit} initialValues={initialValues} />);

        fireEvent.change(screen.getByTestId('search-text'), { target: { value: '--wrongText' } });

        fireEvent.click(screen.getByTestId('submit-btn'));

        await waitFor(() => {
            expect(screen.getByText(
                "Usernames can only contain alphanumeric characters and dashes, and could not start or finished with dashes"
            )).toBeInTheDocument();
        });
    });
});
