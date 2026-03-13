export const getFileSize = (size: number) => {
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (size === 0) return '0 Bytes';

  const i: number = Math.floor(Math.log(size) / Math.log(1024));

  return `${Math.round(size / Math.pow(1024, i))} ${sizes[i]}`;
};