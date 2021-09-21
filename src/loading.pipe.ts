import {Pipe, PipeTransform} from '@angular/core';
import {LoadableContent} from './loadable-content';

@Pipe({
    name: 'loading'
})
export class LoadingPipe implements PipeTransform {

    transform<T>(value: LoadableContent<T> | null): boolean {
        return !!value && value.isLoading;
    }

}
