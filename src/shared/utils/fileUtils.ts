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

export const base64ToFile = (base64: string, filename: string): File => {
  const [meta, data] = base64.split(',');

  const mime =
    meta?.match(/data:(.*?);base64/)?.[1] ?? 'application/octet-stream';

  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new File([bytes], filename, { type: mime });
};
