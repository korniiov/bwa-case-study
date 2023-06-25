import {expect, jest, test} from '@jest/globals';
import { waitFor, renderHook, act } from '@testing-library/react';
import useGitHubSearch from '../useGitHubSearch';
import IUserSearchResponse from "../api/interfaces/IUserSearchResponse";
import SEARCH_TYPE from "../../core/enum/searchType";
import ISearchData from "../../core/api/interfaces/ISearchData";

const initSearchParams = {
    text: '',
    type: SEARCH_TYPE.USER,
};

const searchData = {
    text: '',
    type: SEARCH_TYPE.USER,
    page: 1
};

const mockProxy = jest.fn(() => Promise.resolve({} as IUserSearchResponse));

describe('useGitHubSearch', () => {
    beforeEach(() => {
        mockProxy.mockClear();
    });

    test('should update the response states', async () => {
        const { result } = renderHook(() =>
            useGitHubSearch({ proxy: mockProxy, initSearchParams })
        );

        await act(() => {
            result.current.request(searchData);
        });

        expect(result.current.isFetching).toBe(true);

        await waitFor(() => {
            expect(result.current.isFetching).toBe(false);
        });
    });

    test('should update page when trigger request', async () => {
        const { result } = renderHook(() =>
            useGitHubSearch({ proxy: mockProxy, initSearchParams })
        );

        await act(() => {
            result.current.request(searchData);
        });

        await waitFor(() => {
            expect(result.current.page).toBe(1);
        });
    });

    test('should call onSetPage when the page is changed', () => {
        const { result } = renderHook(() =>
            useGitHubSearch({ proxy: mockProxy as (data: ISearchData) => Promise<IUserSearchResponse>, initSearchParams })
        );

        const page = 2;

        act(() => {
            result.current.onSetPage(page);
        });

        expect(result.current.page).toBe(page);
    });
});
