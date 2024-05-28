import { render } from '@testing-library/react';
import Button from '..';

describe('Button', () => {
  test('renders button with provided children', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  test('renders button with provided icon', () => {
    const { getByTestId } = render(<Button icon={<i data-testid="icon" className="fa fa-star" />} />);
    const icon = getByTestId('icon');
    expect(icon).toBeInTheDocument();
  });

  test('renders button text correctly', () => {
    const buttonText = 'Click me';
    const { getByText } = render(<Button>{buttonText}</Button>);
    const button = getByText(buttonText);
    expect(button).toBeInTheDocument();
  });

  // test('calls onClick callback when clicked', () => {
  //   const onClickMock = jest.fn();
  //   const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);
  //   const button = getByText('Click me');
  //   fireEvent.click(button);
  //   expect(onClickMock).toHaveBeenCalledTimes(1);
  // });

  // test('applies correct class names and styles', () => {
  //   const { container } = render(<Button type="primary" rounded="medium" />);
  //   const button = container.firstChild;
  //   expect(button).toHaveClass('bg-yellow-primary');
  //   // expect(button).toHaveClass('rounded-medium');
  // });

  // test('applies block attribute correctly', () => {
  //   const { container } = render(<Button block />);
  //   const button = container.firstChild;
  //   expect(button).toHaveClass('w-full');
  // });

  // test('applies ghost attribute correctly', () => {
  //   const { container } = render(<Button ghost />);
  //   const button = container.firstChild;
  //   expect(button).toHaveClass('bg-transparent');
  // });

  // test('applies size attribute correctly', () => {
  //   const { container } = render(<Button size="large" />);
  //   const button = container.firstChild;
  //   expect(button).toHaveClass('px-[2.5rem]');
  //   expect(button).toHaveClass('py-[1.25rem]');
  // });

  // test('renders icon in correct position', () => {
  //   const { getByTestId, getByText } = render(
  //     <Button icon={<span data-testid="icon">Icon</span>} iconPosition="right">
  //       Click me
  //     </Button>
  //   );
  //   const icon = getByTestId('icon');
  //   const buttonText = getByText('Click me');
  //   expect(buttonText.nextSibling).toBe(icon);
  // });

  // test('applies disabled attribute correctly', () => {
  //   const onClickMock = jest.fn();
  //   const { getByText } = render(
  //     <Button onClick={onClickMock} disabled>
  //       Click me
  //     </Button>
  //   );
  //   const button = getByText('Click me');
  //   fireEvent.click(button);
  //   expect(onClickMock).not.toHaveBeenCalled();
  //   // expect(button).toBeDisabled();
  // });

  // Add more test cases for other scenarios
});
