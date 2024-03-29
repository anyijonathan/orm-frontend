import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginScreen from '../../../src/Pages/Authentication/login'; 
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

/**
  * <test_summary>
  * 
  * </test_summary>
  * <component_tested>
  * 
  * </component_tested> 
  * <test_conditions>
  * 
  * </test_conditions> 
  */ 
const mockStore = configureStore([thunk]);
const initialState = {};
const store = mockStore(initialState);

jest.mock('../../../src/Services/Actions/authAction', () => ({
  ...jest.requireActual('../../../src/Services/Actions/authAction'), 
  validateUserEmail: jest.fn(),
  userLogin: jest.fn(),
  
}));


it('matches component snapshot', () => {
  const tree = render(
    <BrowserRouter>
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    </BrowserRouter>
  ).asFragment();
  
  expect(tree).toMatchSnapshot();
});


describe('YourComponent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Next button disabled if userName and Password field empty!', () => {
   
    const initialState = { authState: true };
    const store = mockStore(initialState);
    render(
        <BrowserRouter><Provider store={store}>          
                <LoginScreen />          
        </Provider></BrowserRouter>
      );

    expect(screen.getByText('Next')).toBeDisabled();
  });   

  it('should call the verifyEmail function when email input is blurred with 998 code', async () => {
   
    const validateUserEmailMock = jest.fn().mockResolvedValue({
      payload:{userData: {
        data: {
          code: '998',
          data: {},
        },
      },},
    });
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch = validateUserEmailMock;
      render(
        <BrowserRouter><Provider store={store}>
          <LoginScreen  />
        </Provider></BrowserRouter>
      );
    const emailInput = screen.getByLabelText(/Email/i); 
    fireEvent.blur(emailInput);
    await waitFor(() => {
      expect(validateUserEmailMock).toHaveBeenCalledTimes(1);
    });
  });
  it('should call the verifyEmail function when email input is blurred with 802 code', async () => {
   
    const validateUserEmailMock = jest.fn().mockResolvedValue({
      payload:{userData: {
        data: {
          code: '802',
          data: {},
        },
      },},
    });
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch = validateUserEmailMock;
      render(
        <BrowserRouter><Provider store={store}>
          <LoginScreen  />
        </Provider></BrowserRouter>
      );
    const emailInput = screen.getByLabelText(/Email/i); 
    fireEvent.blur(emailInput);
    await waitFor(() => {
      expect(validateUserEmailMock).toHaveBeenCalledTimes(1);
    });
  });
  it('login process- Next button is clicked-with empty password', async () => {
   
    const validateUserEmailMock = jest.fn().mockResolvedValue({
      payload:{
        userData: {
           data: {
             description: "",
             code: "00",
             data: {
               token: "",
               refreshToken: "",
               failLoginCount: 0,
               isAccountLocked: false,
               userType: 2
             } 
           },
         },
       } 
    });
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch = validateUserEmailMock;
      render(
        <BrowserRouter><Provider store={store}>
          <LoginScreen  />
        </Provider></BrowserRouter>
      );

    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, 'testuser');
    fireEvent.change(emailInput, { target: { value: 'testUsername' } });  
    fireEvent.blur(emailInput);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: '' } }); 
    validateUserEmailMock.mockClear();
    const loginResponseMock = jest.fn().mockResolvedValueOnce({
      payload:{
        userData: {
           data: {
             description: "",
             code: "996",
             data: {
               token: "",
               refreshToken: "",
               failLoginCount: 0,
               isAccountLocked: true,
               userType: 1
             } 
           },
         },
       }
    });  
    store.dispatch=loginResponseMock;
    await waitFor(() => {
      screen.getByText(/next/i);
      expect(screen.getByText('Next')).toBeDisabled();  
    });
    
  });

  
});