import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../shared/ui';
import { icons } from '../shared/ui/Icon/icons.ts';

const meta: Meta<typeof Icon> = {
  title: 'Shared/Icon',
  component: Icon
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const AllIcons: Story = {
  render: () => {
    const entries = Object.entries(icons);

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gap: '20px',
          padding: '20px'
        }}
      >
        {entries.map(([name]) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Icon
              name={name as keyof typeof icons}
              alt={name}
              style={{ width: 24, height: 24 }}
            />
            <span style={{ fontSize: '12px', textAlign: 'center' }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    );
  }
};
