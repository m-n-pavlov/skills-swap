export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Не удалось прочитать файл как строку.'));
      }
    };

    reader.onerror = () => {
      reject(reader.error || new Error('Ошибка при чтении файла.'));
    };

    reader.readAsDataURL(file);
  });
};
