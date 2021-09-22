import {none, Option, some} from 'scats';

export enum LoadStatus {
    Empty, Loading, Loaded, Error
}

export class LoadableContent<T> {

    private constructor(readonly value: Option<T>,
                        readonly error: Option<any>,
                        readonly status: LoadStatus) {
    }

    map<K>(mapper: (value: T) => K): LoadableContent<K> {
        return new LoadableContent<K>(
            this.value.map(x => mapper(x)),
            this.error,
            this.status
        );
    }

    get initial(): boolean {
        return this.status === LoadStatus.Empty;
    }

    get loading(): boolean {
        return this.status === LoadStatus.Loading;
    }

    get loaded(): boolean {
        return this.status === LoadStatus.Loaded;
    }

    get hasError(): boolean {
        return this.status === LoadStatus.Error;
    }

    get toLoadingState(): LoadableContent<T> {
        return new LoadableContent(this.value, this.error, LoadStatus.Loading);
    }

    toErrorState(error: unknown): LoadableContent<T> {
        return new LoadableContent(this.value, some(error), LoadStatus.Error);
    }

    static initial(): LoadableContent<any> {
        return new LoadableContent(none, none, LoadStatus.Empty);
    }

    static loading(): LoadableContent<any> {
        return new LoadableContent(none, none, LoadStatus.Loading);
    }

    static loaded<T>(value: T): LoadableContent<T> {
        return new LoadableContent(some(value), none, LoadStatus.Loaded);
    }

    static error(e: unknown): LoadableContent<any> {
        return new LoadableContent(none, some(e), LoadStatus.Error);
    }

}
