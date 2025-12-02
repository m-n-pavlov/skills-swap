import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import LinkButton from './LinkButton';
import './linkButton.module.css';

const meta = {
  title: 'Components/LinkButton',
  component: LinkButton,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ],
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    to: {
      control: 'text',
      description: 'URL or path for navigation'
    },
    style: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Visual style of the button'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
      description: 'Size of the button'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    },
    children: {
      control: 'text',
      description: 'Button content'
    }
  }
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    to: '/primary',
    style: 'primary',
    size: 'md'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    to: '/secondary',
    style: 'secondary',
    size: 'md'
  }
};

export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    to: '/tertiary',
    style: 'tertiary',
    size: 'md'
  }
};

export const ExtraSmall: Story = {
  args: {
    children: 'XS Button',
    to: '/xs',
    style: 'primary',
    size: 'xs'
  }
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    to: '/small',
    style: 'primary',
    size: 'sm'
  }
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    to: '/medium',
    style: 'primary',
    size: 'md'
  }
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    to: '/large',
    style: 'primary',
    size: 'lg'
  }
};

export const ExtraLarge: Story = {
  args: {
    children: 'XL Button',
    to: '/xl',
    style: 'primary',
    size: 'xl'
  }
};

export const XXLarge: Story = {
  args: {
    children: 'XXL Button',
    to: '/xxl',
    style: 'primary',
    size: 'xxl'
  }
};

export const XXXLarge: Story = {
  args: {
    children: 'XXXL Button',
    to: '/xxxl',
    style: 'primary',
    size: 'xxxl'
  }
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span>→</span> Navigate
      </>
    ),
    to: '/with-icon',
    style: 'primary',
    size: 'md'
  }
};

export const CustomClassName: Story = {
  args: {
    children: 'Custom Styled',
    to: '/custom',
    style: 'primary',
    size: 'md',
    className: 'custom-class'
  }
};

export const AllSizes: { render: () => JSX.Element } = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}
    >
      <LinkButton to='/xs' style='primary' size='xs'>
        XS
      </LinkButton>
      <LinkButton to='/sm' style='primary' size='sm'>
        SM
      </LinkButton>
      <LinkButton to='/md' style='primary' size='md'>
        MD
      </LinkButton>
      <LinkButton to='/lg' style='primary' size='lg'>
        LG
      </LinkButton>
      <LinkButton to='/xl' style='primary' size='xl'>
        XL
      </LinkButton>
      <LinkButton to='/xxl' style='primary' size='xxl'>
        XXL
      </LinkButton>
      <LinkButton to='/xxxl' style='primary' size='xxxl'>
        XXXL
      </LinkButton>
    </div>
  )
};

export const AllStyles: { render: () => JSX.Element } = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
    >
      <LinkButton to='/primary' style='primary' size='md'>
        Primary
      </LinkButton>
      <LinkButton to='/secondary' style='secondary' size='md'>
        Secondary
      </LinkButton>
      <LinkButton to='/tertiary' style='tertiary' size='md'>
        Tertiary
      </LinkButton>
    </div>
  )
};
