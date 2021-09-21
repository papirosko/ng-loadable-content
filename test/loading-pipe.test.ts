import {LoadableContent, LoadingPipe} from '../src';

describe('Loading Pipe', () => {

    test('should return true if content is loading', () => {
        expect(new LoadingPipe().transform(LoadableContent.loading())).toBeTruthy();
    });

    test('should return false if content is not loaded', () => {
        expect(new LoadingPipe().transform(LoadableContent.initial())).toBeFalsy();
        expect(new LoadingPipe().transform(LoadableContent.loaded({}))).toBeFalsy();
        expect(new LoadingPipe().transform(LoadableContent.error({}))).toBeFalsy();
    });

    test('should return false if content is null', () => {
        expect(new LoadingPipe().transform(null)).toBeFalsy();
    });
});
