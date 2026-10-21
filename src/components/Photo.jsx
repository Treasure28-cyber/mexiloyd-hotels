import { photoByFile } from '../data.js';

export function Photo({ file, className = 'photo', priority = false, ...props }) {
  const photo = photoByFile[file];
  return <img src={photo.src} alt={photo.alt} width="680" height="510"
    className={className} loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : 'auto'} decoding="async" {...props} />;
}
