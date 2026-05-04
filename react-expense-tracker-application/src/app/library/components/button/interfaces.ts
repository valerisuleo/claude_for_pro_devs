import { IClasses, IDarkMode } from '../../../common/interfaces';

export interface Btn {
    label: string;
    classes: IClasses;
    type: 'button' | 'submit' | 'reset';
    onEmitEvent: () => void;
}

export type IBtn = Btn & IDarkMode;
