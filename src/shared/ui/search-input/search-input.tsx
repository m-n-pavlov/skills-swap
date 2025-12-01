import type { ChangeEvent } from 'react';

interface SearchInputProps {
  value: string;
  type: 'text' | 'search';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  showClearButton?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  type = 'search',
  onChange,
  name,
  placeholder,
  leftIcon,
  rightIcon,
  onClick,
  onClear,
  showClearButton = true // Значение по умолчанию
}) => {
  const handleClear = () => {
    onClear?.();
    onChange({ target: { value: '', name } } as ChangeEvent<HTMLInputElement>);
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div className='search-input-wrapper'>
      {leftIcon !== undefined ? (
        leftIcon
      ) : (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M11.5349 21.0698C6.27908 21.0698 2 16.7907 2 11.5349C2 6.27908 6.27908 2 11.5349 2C16.7907 2 21.0698 6.27908 21.0698 11.5349C21.0698 16.7907 16.7907 21.0698 11.5349 21.0698ZM11.5349 3.39535C7.04187 3.39535 3.39535 7.05118 3.39535 11.5349C3.39535 16.0186 7.04187 19.6745 11.5349 19.6745C16.0279 19.6745 19.6745 16.0186 19.6745 11.5349C19.6745 7.05118 16.0279 3.39535 11.5349 3.39535Z'
            fill='#69735D'
          />
          <path
            d='M21.3024 22C21.1257 22 20.9489 21.9348 20.8094 21.7953L18.9489 19.9348C18.6791 19.6651 18.6791 19.2186 18.9489 18.9488C19.2187 18.679 19.6652 18.679 19.935 18.9488L21.7954 20.8093C22.0652 21.079 22.0652 21.5255 21.7954 21.7953C21.6559 21.9348 21.4791 22 21.3024 22Z'
            fill='#69735D'
          />
        </svg>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        onClick={handleInputClick}
        className={`search-input ${value ? 'has-value' : ''}`}
      />
      {showClearButton &&
        value && ( //кнопка очистки
          <button
            type='button'
            className='icon right'
            onClick={handleClear}
            aria-label='Очистить поле'
          >
            {rightIcon ?? (
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M16.7438 8.28748L8.25847 16.7728C7.96856 17.0627 7.48772 17.0627 7.19781 16.7728C6.9079 16.4828 6.9079 16.002 7.19781 15.7121L15.6831 7.22682C15.973 6.93691 16.4538 6.93691 16.7438 7.22682C17.0337 7.51673 17.0337 7.99757 16.7438 8.28748Z'
                  fill='#253017'
                />
                <path
                  d='M16.7438 16.7728C16.4538 17.0627 15.973 17.0627 15.6831 16.7728L7.19781 8.28753C6.9079 7.99762 6.9079 7.51679 7.19781 7.22687C7.48772 6.93696 7.96856 6.93696 8.25847 7.22687L16.7438 15.7122C17.0337 16.0021 17.0337 16.4829 16.7438 16.7728Z'
                  fill='#253017'
                />
              </svg>
            )}
          </button>
        )}
    </div>
  );
};
