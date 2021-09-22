import {Pipe, PipeTransform} from '@angular/core';
import {LoadableContent} from './loadable-content';

@Pipe({
    name: 'loadError'
})
export class LoadErrorPipe implements PipeTransform {

    transform<T>(value: LoadableContent<T> | null): boolean {
        return !!value && value.hasError;
    }

}
