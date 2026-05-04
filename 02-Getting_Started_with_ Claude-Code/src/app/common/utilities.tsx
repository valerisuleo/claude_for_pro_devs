import placeholder from '../../assets/placeholder.png';

import {
    FaWindows,
    FaPlaystation,
    FaXbox,
    FaApple,
    FaLinux,
    FaAppStoreIos,
} from 'react-icons/fa6';

export const iconMap = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    mac: FaApple,
    linux: FaLinux,
    ios: FaAppStoreIos,
};

export function imgResizer(url: string) {
    if (!url) return placeholder;
    const index = url.indexOf('media/') + 'media/'.length;
    return url.slice(0, index) + 'crop/600/400/' + url.slice(index);
}
