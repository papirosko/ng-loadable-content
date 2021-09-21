import {LoadableContent, LoadedPipe} from '../src';

describe('Loaded Pipe', () => {

    test('should return loaded value', () => {
        const state = {
            name: 'Foo'
        };
        expect(new LoadedPipe().transform(LoadableContent.loaded(state))).toEqual(state);
    });

    test('should return null if content is not loaded', () => {
        expect(new LoadedPipe().transform(LoadableContent.initial())).toBeNull();
        expect(new LoadedPipe().transform(LoadableContent.loading())).toBeNull();
        expect(new LoadedPipe().transform(LoadableContent.error({}))).toBeNull();
    });

    test('should return null if content is null', () => {
        expect(new LoadedPipe().transform(null)).toBeNull();
    });
});
