import {NgModule} from '@angular/core';
import {LoadErrorPipe} from './load-error.pipe';
import {LoadingPipe} from './loading.pipe';
import {LoadedPipe} from './loaded.pipe';

@NgModule({
    declarations: [
        LoadedPipe,
        LoadingPipe,
        LoadErrorPipe
    ],
    exports: [
        LoadedPipe,
        LoadingPipe,
        LoadErrorPipe
    ]
})
export class LoadableContentModule {

}
