import { FileType } from '../../types/boards.types';

export function getFileType(filename: string): FileType {
  const ext = filename.split(".")[filename.split(".").length - 1].toLowerCase();

  try {
    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif') {
      return 'image';
    }
    if (ext === 'pdf') {
      return 'pdf';
    }
    if (ext === 'xls' || ext === 'xlsx' || ext === 'csv') {
      return 'xls';
    }
    if (ext === 'doc' || ext === 'docx') {
      return 'doc';
    }
    if (ext === 'ppt' || ext === 'pptx') {
      return 'ppt';
    }
    if (ext === 'mp4' || ext === 'flv' || ext === 'mkv' || ext === '3gp' || ext === 'mov') {
      return 'video';
    }
    if (ext === 'zip' || ext === 'ofx') {
      return 'zip';
    }
  } catch (e) {
    return 'unknown';
  }

  return 'unknown';
}