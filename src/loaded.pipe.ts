import {Pipe, PipeTransform} from '@angular/core';
import {LoadableContent} from './loadable-content';

@Pipe({
    name: 'loaded'
})
export class LoadedPipe implements PipeTransform {

    transform<T>(value: LoadableContent<T> | null): T | null {
        return value && value.loaded ? value.value.orNull : null;
    }

}
