/* eslint-disable react/react-in-jsx-scope */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react';

import '@testing-library/jest-dom';
import { Products } from './index';

const server = setupServer();
describe('Given Notes', () => {
  // Enable API mocking before tests.
  beforeAll(() => server.listen());
  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());
  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  test('WHEN product-list component is mounted THEN render the list of products', async () => {
    server.use(
      rest.get(
        'https://my-json-server.typicode.com/benirvingplt/products/products',
        (req, res, ctx) => res(
          ctx.json([
            {
              id: 1,
              colour: 'Black',
              name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
              price: 10,
              img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
            },
          ]),
        ),
      ),
    );
    render(<Products />);
    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    screen.getAllByTestId('product-item');
  });
  test('WHEN product-list api returns with no product THEN render no product data available text', async () => {
    server.use(
      rest.get(
        'https://my-json-server.typicode.com/benirvingplt/products/products',
        (req, res, ctx) => res(ctx.json([])),
      ),
    );
    render(<Products />);

    // wait for Data to load
    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    const noProductsListMessage = screen.getByText('No Product Available');
    expect(noProductsListMessage).toBeInTheDocument();
  });

  test('WHEN product-list api return error THEN render with error message text', async () => {
    server.use(
      rest.get(
        'https://my-json-server.typicode.com/benirvingplt/products/products',
        (req, res, ctx) => res(ctx.status(404), ctx.json({ message: 'Internal Server Error' })),
      ),
    );
    render(<Products />);
    // wait for Data to load
    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    const errorMsg = screen.getByText('Something went wrong');
    expect(errorMsg).toBeInTheDocument();
  });
});
