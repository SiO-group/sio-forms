import { IconType } from "@sio-group/form-types";
import { ReactNode } from "react";

export const Icon = ({ icon }: { icon?:IconType }): ReactNode | null => {
  if (!icon) return null;

  if (typeof icon === 'string') {
    return <span className='form-field__icon'><i className={icon} /></span>;
  }

  switch (icon.type) {
    case 'class': return <span className='form-field__icon'><i className={icon.value} /></span>;
    case 'emoji': return <span className='form-field__icon'><span>{icon.value}</span></span>;
    case 'html': return <span dangerouslySetInnerHTML={{ __html: icon.value }} className='form-field__icon'></span>;
  }
}