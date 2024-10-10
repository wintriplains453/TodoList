import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import TodoComponent from './todo'

afterEach(() => {
  cleanup();
})

test('Render page', () => {
  render(<TodoComponent />)

  const node = screen.getByText(/What needs to be done/i)
  expect(node).toBeInTheDocument();
})

test('Switch todo options in block/none state', () => {
  render(<TodoComponent />)

  const button = screen.queryByTestId('test-header')
  expect(screen.queryByTestId('test-checked-switch')).toBeNull();
  fireEvent.click(button)
  expect(screen.queryByTestId('test-checked-switch')).toBeInTheDocument();
  fireEvent.click(button)
  expect(screen.queryByTestId('test-checked-switch')).toBeNull();
})