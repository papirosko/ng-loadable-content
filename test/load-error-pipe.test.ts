import {LoadableContent, LoadErrorPipe} from '../src';

describe('LoadError Pipe', () => {

    test('should return true if content is error', () => {
        expect(new LoadErrorPipe().transform(LoadableContent.error({}))).toBeTruthy();
    });

    test('should return false if content is not loaded', () => {
        expect(new LoadErrorPipe().transform(LoadableContent.initial())).toBeFalsy();
        expect(new LoadErrorPipe().transform(LoadableContent.loaded({}))).toBeFalsy();
        expect(new LoadErrorPipe().transform(LoadableContent.loading())).toBeFalsy();
    });

    test('should return false if content is null', () => {
        expect(new LoadErrorPipe().transform(null)).toBeFalsy();
    });
});
