import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayJsDateProvider } from './DayJSDateProvider/DayJsDateProvider';

container.registerSingleton<IDateProvider>(
    'DayJsDateProvider',
    DayJsDateProvider,
);
