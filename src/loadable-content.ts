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

    get isInitial(): boolean {
        return this.status === LoadStatus.Empty;
    }

    get isLoading(): boolean {
        return this.status === LoadStatus.Loading;
    }

    get isLoaded(): boolean {
        return this.status === LoadStatus.Loaded;
    }

    get isError(): boolean {
        return this.status === LoadStatus.Error;
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
