import type { Meta, StoryObj } from '@storybook/react';
import { InputFile } from '../shared/ui/InputFile';
import clsx from 'clsx';
import styles from '../shared/ui/InputFile/InputFile.module.css';

const meta: Meta<typeof InputFile> = {
  title: 'Shared/InputFile',
  component: InputFile,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'icon-only'],
      description: 'Вариант отображения инпута'
    }
  }
};

export default meta;
type Story = StoryObj<typeof InputFile>;

// Default — обычное состояние, можно взаимодействовать с drag&drop
export const Default: Story = {
  render: (args) => <InputFile {...args} />,
  args: {
    onChange: (files) => console.log('Selected files:', files)
  }
};

export const IconOnly: Story = {
  args: {
    variant: 'icon-only'
  },
  name: 'Только иконка'
};

// Active — статическое "активное" состояние, подсветка рамки
export const Active: Story = {
  render: () => (
    <div className={clsx(styles.wrapper, styles.active)}>
      <span className={styles.label}>
        Перетащите или выберите изображения навыка
      </span>
      <div className={styles.button}>Выбрать изображения</div>
    </div>
  )
};
