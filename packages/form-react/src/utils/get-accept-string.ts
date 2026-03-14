import { AcceptType } from "@sio-group/form-types";

/**
 * Get the accept attribute for file inputs based on the provided accept-type.
 * @param accept - Accept type which can be a string, an array of strings, or shorthand types like 'image', 'video', or 'audio'.
 */
export const getAccept = (accept?: AcceptType): string | undefined => {
  if (Array.isArray(accept)) {
    return accept
      .map(item => {
        if (item === 'image') return 'image/*';
        if (item === 'video') return 'video/*';
        if (item === 'audio') return 'audio/*';
        return item;
      })
      .join(', ');
  }

  if (accept === 'image') return 'image/*';
  if (accept === 'video') return 'video/*';
  if (accept === 'audio') return 'audio/*';

  return accept;
};
