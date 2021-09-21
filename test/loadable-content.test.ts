import {LoadableContent} from '../src';
import {some} from 'scats';

describe('LoadableContent', () => {


    test('should have consistent state', () => {
        const initial = LoadableContent.initial();
        expect(initial.isInitial).toBeTruthy();
        expect(initial.isLoading).toBeFalsy();
        expect(initial.isLoaded).toBeFalsy();
        expect(initial.isError).toBeFalsy();

        const loading = LoadableContent.loading();
        expect(loading.isInitial).toBeFalsy();
        expect(loading.isLoading).toBeTruthy();
        expect(loading.isLoaded).toBeFalsy();
        expect(loading.isError).toBeFalsy();

        const loaded = LoadableContent.loaded({});
        expect(loaded.isInitial).toBeFalsy();
        expect(loaded.isLoading).toBeFalsy();
        expect(loaded.isLoaded).toBeTruthy();
        expect(loaded.isError).toBeFalsy();

        const failed = LoadableContent.error({});
        expect(failed.isInitial).toBeFalsy();
        expect(failed.isLoading).toBeFalsy();
        expect(failed.isLoaded).toBeFalsy();
        expect(failed.isError).toBeTruthy();
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


});
