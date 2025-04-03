export type LogFn = (...args: Array<unknown>) => void;

export type LoggerType = {
  fatal: LogFn;
  error: LogFn;
  warn: LogFn;
  info: LogFn;
  debug: LogFn;
  trace: LogFn;
};

// Those are pretty standard and match https://getpino.io/#/docs/api?id=loggerlevels-object
enum LogLevel {
  Trace = 10,
  Debug = 20,
  Info = 30,
  Warn = 40,
  Error = 50,
  Fatal = 60,
}

type LogAtLevelFnType = (
  level: LogLevel,
  ...args: ReadonlyArray<unknown>
) => void;

export class Logger {
  private logFn: LogFn | null = null;

  constructor(private label?: string) {}

  setLogFn(fn: LogFn) {
    this.logFn = fn;
  }

  private log(level: LogLevel, ...args: unknown[]) {
    if (!this.logFn) {
      throw new Error('Logger is not initialized: call setLogFn() first.');
    }
    const prefix = this.label ? `[${this.label}]` : '';
    this.logFn(level, prefix, ...args);
  }

  trace(...args: unknown[]) {
    this.log(LogLevel.Trace, ...args);
  }
  debug(...args: unknown[]) {
    this.log(LogLevel.Debug, ...args);
  }
  info(...args: unknown[]) {
    this.log(LogLevel.Info, ...args);
  }
  warn(...args: unknown[]) {
    this.log(LogLevel.Warn, ...args);
  }
  error(...args: unknown[]) {
    this.log(LogLevel.Error, ...args);
  }
  fatal(...args: unknown[]) {
    this.log(LogLevel.Fatal, ...args);
  }
}
