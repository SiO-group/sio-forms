import { CustomIcons } from "./custom-icons";

export const FileTypeIcon = (mime: string) => {
  let icon;

  switch (mime) {
    case 'text/plain':
      icon = CustomIcons.FileIcon();
      break;
    case 'text/uri-list':
      return CustomIcons.Globe();
    case 'application/xls':
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.ms-excel.sheet.macroEnabled.12':
    case 'application/vnd.ms-excel.sheet.binary.macroEnabled.12':
      icon = CustomIcons.Excel();
      break;
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/vnd.ms-word':
    case 'application/vnd.ms-word.document.macroEnabled.12':
      icon = CustomIcons.Word();
      break;
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    case 'application/vnd.ms-powerpoint.presentation.macroEnabled.12':
    case 'application/vnd.openxmlformats-officedocument.presentationml.slideshow':
      icon = CustomIcons.PowerPoint();
      break;
    case 'application/pdf':
      icon = CustomIcons.Pdf();
      break;
    case 'audio/mpeg':
    case 'audio/wav':
    case 'audio/x-wav':
    case 'audio/ogg':
    case 'audio/mp4':
      icon = CustomIcons.Audio();
      break;
    case 'image/jpeg':
    case 'image/png':
    case 'image/bmp':
    case 'image/gif':
    case 'image/webp':
    case 'image/svg+xml':
    case 'image/heic':
    case 'image/heif':
      icon = CustomIcons.Image();
      break;
    case 'video/mp4':
    case 'video/quicktime':
    case 'video/webm':
    case 'video/x-msvideo':
    case 'video/x-matroska':
      icon = CustomIcons.Video();
      break;
    default:
      icon = CustomIcons.FileIcon();
  }

  return icon;
};