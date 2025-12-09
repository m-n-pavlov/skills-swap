import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { UserMenu } from '../shared/ui/UserMenu/UserMenu';

const meta: Meta<typeof UserMenu> = {
  title: 'Components/UserMenu',
  component: UserMenu,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ padding: '20px', maxWidth: '280px' }}>
          <Story />
        </div>
      </MemoryRouter>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof UserMenu>;

export const Default: Story = {
  args: {}
};

export const WithActiveSkills: Story = {
  args: {},
  parameters: {
    reactRouter: {
      routePath: '/skills'
    }
  }
};

export const WithActivePersonal: Story = {
  args: {},
  parameters: {
    reactRouter: {
      routePath: '/personal'
    }
  }
};

export const AllEnabled: Story = {
  args: {},
  render: () => (
    <MemoryRouter>
      <div style={{ padding: '20px', maxWidth: '280px' }}>
        <nav className='user-menu'>
          <ul className='user-menu__list'>
            <li className='user-menu__item'>
              <a className='user-menu__link user-menu__link--active'>
                <span className='user-menu__icon'>📋</span>
                <span className='user-menu__label'>Заявки</span>
                <span className='user-menu__badge'>3</span>
              </a>
            </li>
            <li className='user-menu__item'>
              <a className='user-menu__link'>
                <span className='user-menu__icon'>🔄</span>
                <span className='user-menu__label'>Мои обмены</span>
              </a>
            </li>
            <li className='user-menu__item'>
              <a className='user-menu__link'>
                <span className='user-menu__icon'>⭐</span>
                <span className='user-menu__label'>Избранное</span>
              </a>
            </li>
            <li className='user-menu__item'>
              <a className='user-menu__link'>
                <span className='user-menu__icon'>🎯</span>
                <span className='user-menu__label'>Мои навыки</span>
              </a>
            </li>
            <li className='user-menu__item'>
              <a className='user-menu__link'>
                <span className='user-menu__icon'>👤</span>
                <span className='user-menu__label'>Личные данные</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </MemoryRouter>
  )
};
