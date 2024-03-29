export const useState = jest.fn();
export const useAppStateSelector = jest.fn();

  export const mockUseLocation = () => ({
    state: { email: 'testUsername' },
    pathname: '',
    search: '',
    hash: '',
    key: '',
  });

  export const setMockLocationState = (mockState:any) => {
    return {
      ...jest.requireActual('react-router-dom'),
      useLocation: () => ({
        state: mockState,
      }),
    };
  };
