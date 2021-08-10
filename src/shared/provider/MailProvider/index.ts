import { container } from 'tsyringe';
import { IMailProvider } from './IMailProvaider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';



container.registerSingleton<IMailProvider>(
    'EtherealMailProvider',
    EtherealMailProvider
    ,
);