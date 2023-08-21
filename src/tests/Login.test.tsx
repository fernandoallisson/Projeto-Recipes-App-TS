import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import mockData from './mockData';
import userEvent from '@testing-library/user-event';
import { Login } from '../Pages/Login';


describe('testando a aplicação', () => {
//   beforeEach(() => {
//     global.fetch = vi.fn().mockResolvedValue({
//       json: async () => (mockData),
//     });
//   });
    const emailUser = 'pedro@gmail.com';
    test.only('renders Login component', () => {
      render(<Login />);
    //   const filterText = screen.getByRole('textbox');
    //   expect(filterText).toBeInTheDocument();

    //   const login = screen.getByRole('textbox', {  name: /email: senha: enter/i});
    //   expect(login).toBeInTheDocument();

    //   const password = screen.getByDisplayValue(/1234567/i);
    //   expect(password).toBeInTheDocument();

    const emailInput = screen.getByTestId("email-input");
    fireEvent.change(input, {target: {value: emailUser}});
    expect(emailUser).toBeInTheDocument();
      
    });
});
//     test('renders App component e se o button Apply Filter existe', () => {
//       render(<App />);
//       const filterApply = screen.getByRole('button', {  name: /apply filter/i});
//       expect(filterApply).toBeInTheDocument();
//       screen.debug();
//     });
//     test('renders App component e se o button Filter Value existe', () => {
//       render(<App />);
//       const filterValue = screen.getByRole('spinbutton');
//       expect(filterValue).toBeInTheDocument();
//       screen.debug();
//     });
 
//   test('renders App component e se o button Filter Value existe', async () => {
//     render(<App />);
//     const view1 = await screen.findByTestId("column-filter");
//     expect(view1).toBeInTheDocument();
//     const view2 = await screen.findByTestId("comparison-filter");
//     expect(view2).toBeInTheDocument();
//     const view3 = await screen.findByTestId("value-filter");
//     expect(view3).toBeInTheDocument();
//     // const view4 = await screen.getByRole('button', {  name: /apply filter/i});
//     // expect(view4).toBeInTheDocument();
//     const applyFiltersBtn = await screen.findByRole('button', {  name: /Apply Filter/i});
//     userEvent.click(applyFiltersBtn);

//     const removeFiltersBtn = await screen.findByRole('button', {  name: /Remove All Filters/i});
//     userEvent.click(removeFiltersBtn);
//     // expect(removeFiltersBtn).toBeInTheDocument();
//     // const filterValue = await screen.getByDisplayValue(/24/i);
//     // expect(filterValue).toBeInTheDocument();
//     // const filterPop = await screen.getByText(/population maior que 24/i);
//     // expect (filterPop).toBeInTheDocument;
//     // const exhbitBtn =within(view).getByRole('button', {name: /remove/i});
//     // expect(exhbitBtn).toBeInTheDocument();
//   });
// });
