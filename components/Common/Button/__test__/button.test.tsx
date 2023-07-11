import { render, fireEvent } from '@testing-library/react';
import Button from '..';

describe('Button', () => {
  test('renders button with provided children', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  test('renders button with provided icon', () => {
    const { getByTestId } = render(
      <Button icon={<i data-testid="icon" className="fa fa-star" />} />
    );
    const icon = getByTestId('icon');
    expect(icon).toBeInTheDocument();
  });

  test('applies additional className to button', () => {
    const { container } = render(
      <Button className="custom-class">Button</Button>
    );
    const button = container.firstChild;
    expect(button).toHaveClass('custom-class');
  });

  test('calls onClick handler when button is clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    );
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies primary style to button', () => {
    const { container } = render(<Button type="primary">Primary</Button>);
    const button = container.firstChild;
    expect(button).toHaveClass('bg-[#2A2A2A]');
  });

  test('applies secondary style to button', () => {
    const { container } = render(<Button type="secondary">Secondary</Button>);
    const button = container.firstChild;
    expect(button).toHaveClass('bg-[#2A2A2A]');
  });

  test('applies text style to button', () => {
    const { container } = render(<Button type="text">Text</Button>);
    const button = container.firstChild;
    expect(button).toHaveClass('bg-[#2A2A2A]');
  });
});
