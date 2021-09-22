import {LoadableContent, LoadStatus} from '../src/public-api';
import {none, some} from 'scats';

describe('LoadableContent', () => {


    test('should have consistent state', () => {
        const initial = LoadableContent.initial();
        expect(initial.status).toEqual(LoadStatus.Empty);
        expect(initial.value).toEqual(none);
        expect(initial.error).toEqual(none);
        expect(initial.initial).toBeTruthy();
        expect(initial.loading).toBeFalsy();
        expect(initial.loaded).toBeFalsy();
        expect(initial.hasError).toBeFalsy();

        const loading = LoadableContent.loading();
        expect(loading.status).toEqual(LoadStatus.Loading);
        expect(initial.value).toEqual(none);
        expect(initial.error).toEqual(none);
        expect(loading.initial).toBeFalsy();
        expect(loading.loading).toBeTruthy();
        expect(loading.loaded).toBeFalsy();
        expect(loading.hasError).toBeFalsy();

        const loaded = LoadableContent.loaded({});
        expect(loaded.status).toEqual(LoadStatus.Loaded);
        expect(initial.value).toEqual({});
        expect(initial.error).toEqual(none);
        expect(loaded.initial).toBeFalsy();
        expect(loaded.loading).toBeFalsy();
        expect(loaded.loaded).toBeTruthy();
        expect(loaded.hasError).toBeFalsy();

        const error = new Error('test');
        const failed = LoadableContent.error(error);
        expect(failed.status).toEqual(LoadStatus.Error);
        expect(initial.value).toEqual(none);
        expect(failed.error).toEqual(some(error));
        expect(failed.initial).toBeFalsy();
        expect(failed.loading).toBeFalsy();
        expect(failed.loaded).toBeFalsy();
        expect(failed.hasError).toBeTruthy();
    });

    test('should store loaded content', () => {
        const state = {
            name: 'Foo'
        };
        const loaded = LoadableContent.loaded(state);
        expect(loaded.value).toEqual(some(state));
    });

    test('should map loaded content', () => {
        const state = {
            name: 'Foo'
        };
        const state2 = {
            name: 'Foo2'
        };
        const loaded = LoadableContent.loaded(state);
        expect(loaded.map(() => state2).value).toEqual(some(state2));
    });


    test('should transform to loading state preserving value', () => {
        const state = {
            name: 'Foo'
        };
        const loaded = LoadableContent.loaded(state);
        const loading = loaded.toLoadingState;
        expect(loading.loading).toBeTruthy();
        expect(loading.value).toEqual(some(state));
    });

    test('should transform to error state preserving value', () => {
        const state = {
            name: 'Foo'
        };
        const loaded = LoadableContent.loaded(state);
        const error = new Error('test');
        const errorState = loaded.toErrorState(error);
        expect(errorState.hasError).toBeTruthy();
        expect(errorState.value).toEqual(some(state));
        expect(errorState.error).toEqual(some(error));
    });

});
