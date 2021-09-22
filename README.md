# ng-loadable-content
LoadableContent monad and angular pipes for using it.


# Install
```shell
npm i ng-loadable-content
```


# Usage

Let's assume we have some api endpoint, which returns an object. We have a service, which returns this object:

```typescript
import {Observable} from 'rxjs/internal/Observable';

export interface Dto {
    id: number;
    name: string;
}

export interface RemoteService {
    
    loadObject(): Observable<Dto>;
    
}
```
First we import the module:

```typescript
import {LoadableContentModule} from 'ng-loadable-content';

@NgModule({
    ...
    imports: [
        ...
        LoadableContentModule
    ]
})
export class AppModule {
}

```

We want the loader to be shown while we load that object. Usual use-case for this is to have a store:

```typescript
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LoadableContent} from 'ng-loadable-content';

@Injectable()
export class ObjectStore {

    private readonly _state = new BehaviorSubject<LoadableContent<Dto>>(LoadableContent.initial());
    readonly state$ = this._state.asObservable();

    constructor(private readonly remoteService: RemoteService) {
    }

    reload() {
        this._state.next(LoadableContent.loading());
        this.remoteService.loadObject()
            .subscribe(
                res => this._state.next(LoadableContent.loaded(res)),
                e => this._state.next(LoadableContent.error(e))
            );
    }

}
```

We use `LoadableContent` object to wrap the actual result. This object anytime can answer if the result is already
loaded, is it being loading right now or was there any error while we tried to load it.

Next, we use this in a component:

```typescript
import {Observable} from 'rxjs';
import {LoadableContent} from 'ng-loadable-content';

@Component({
    selector: 'app-object',
    templateUrl: './object.component.html',
    providers: [ObjectStore]

})
export class ObjectComponent {

    readonly state$: Observable<LoadableContent<Dto>>;

    constructor(private readonly objectStore: ObjectStore) {
        this.state$ = objectStore.state$;
        this.objectStore.reload();
    }

}
```

and the template.

```angular2html
<div>
    
    <ng-container *ngIf="state$ | async as state">
        <div *ngIf="state | loaded as dto">{{dto.name}}</div>
        <mat-progress-bar *ngIf="state | loading" mode="indeterminate"></mat-progress-bar>
        <div *ngIf="state | loadError">
            Failed to load dto
        </div>
    </ng-container>

</div>

```

We can use special pipes `loading`, `loaded` and `loadError` to select the required state.


We can also transform the result with `map()` method like this:


```typescript
import {Observable} from 'rxjs';
import {LoadableContent} from 'ng-loadable-content';
import {map} from 'rxjs/internal/operators';

export class ObjectComponent {

    readonly state$: Observable<LoadableContent<string>>;

    constructor(private readonly objectStore: ObjectStore) {
        this.state$ = objectStore.state$.pipe(
            map(s => s.map(_ => _.name))
        );
        this.objectStore.reload();
    }

}
```


The loadable content can be transformed to loading and error state preserving its value. This can be
useful when you want to show the loader above the content (e.g. table), but do not want the content 
to disappear.

```typescript
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LoadableContent} from 'ng-loadable-content';

@Injectable()
export class ObjectStore {

    private readonly _state = new BehaviorSubject<LoadableContent<Dto>>(LoadableContent.initial());
    readonly state$ = this._state.asObservable();

    constructor(private readonly remoteService: RemoteService) {
    }

    reload() {
        const current = this._state.value;
        this._state.next(current.toLoadingState);
        this.remoteService.loadObject()
            .subscribe(
                res => this._state.next(LoadableContent.loaded(res)),
                e => this._state.next(current.toErrorState(e))
            );
    }

}
```

