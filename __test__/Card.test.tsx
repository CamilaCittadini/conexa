import React from 'react';
import { render } from '@testing-library/react';
import { Card } from '@/components';

const title = 'This is the title';
const item = 'STATUS';
const content = 'ALIVE';
const imageSrc = '/image.jpg';
const imageAlt = 'Image';

describe('Card component', () => {
  it('should render the title, chips and image', () => {
    const selected = false;
    const disabled = false;

    const { getByText, getByAltText } = render(
      <Card selected={selected} disabled={disabled}>
        <Card.Image src={imageSrc} alt={imageAlt} />
        <Card.Content>
          <Card.Title>{title}</Card.Title>
          <Card.Chip selected={selected} item={item} content={content} />
        </Card.Content>
      </Card>
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
    expect(getByAltText(imageAlt)).toBeInTheDocument();
  });

  it('should have correct styles when not selected nor disabled', () => {
    const selected = false;
    const disabled = false;

    const { container, getByText } = render(
      <Card selected={selected} disabled={disabled}>
        <Card.Content>
          <Card.Chip selected={selected} item={item} content={content} />
        </Card.Content>
      </Card>
    );

    const chipElement = getByText(content);
    expect(chipElement).toHaveStyle('color:text-green-600');
    expect(container.firstChild).toHaveClass('border-green-100');
    expect(chipElement).toHaveStyle('color:text-gray-500');
    expect(container.firstChild).toHaveClass(
      'flex flex-col min-h-72 border-4 rounded-lg w-full hover:shadow-2xl transition-all duration-500'
    );
  });

  it('should have correct styles when selected', () => {
    const selected = true;
    const disabled = false;

    const { container, getByText } = render(
      <Card selected={selected} disabled={disabled}>
        <Card.Content>
          <Card.Chip selected={selected} item={item} content={content} />
        </Card.Content>
      </Card>
    );

    const chipElement = getByText(content);
    expect(chipElement).toHaveStyle('color:text-green-600');
    expect(container.firstChild).toHaveClass('bg-green-100 border-green-600');
  });

  it('should have correct styles when disabled', () => {
    const selected = false;
    const disabled = true;

    const { container } = render(
      <Card selected={selected} disabled={disabled}>
        <Card.Content>
          <Card.Chip selected={selected} item={item} content={content} />
        </Card.Content>
      </Card>
    );

    expect(container.firstChild).toHaveClass(
      'bg-gray-200 border-gray-300 hover:shadow-none opacity-50'
    );
  });
});
