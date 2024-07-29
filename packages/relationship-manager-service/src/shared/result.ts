export class Result<Value> {
    constructor(
        private readonly _value: Value,
        private readonly _error: Error,
    ) {}

    public static ok<Value>(value: Value) {
        return new Result(value, null);
    }

    public static fail(error: Error) {
        return new Result(null, error);
    }

    public value(): Value {
        return this._value;
    }

    public error(): Error {
        return this._error;
    }

    public isFailure() {
        return this._error !== null && this._error !== undefined;
    }
}
