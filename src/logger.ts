export type LogFn = (...args: Array<unknown>) => void;

// Those are pretty standard and match https://getpino.io/#/docs/api?id=loggerlevels-object
enum LogLevel {
  Trace = 10,
  Debug = 20,
  Info = 30,
  Warn = 40,
  Error = 50,
  Fatal = 60,
}

export class Logger {
  private logFn: LogFn | null = null;

  constructor(logFn: LogFn) {
    this.logFn = logFn;
  }

  private log(level: LogLevel, ...args: unknown[]) {
    if (!this.logFn) {
      throw new Error('Logger is not initialized: call setLogFn() first.');
    }
    this.logFn(level, ...args);
  }

  public trace(...args: unknown[]) {
    this.log(LogLevel.Trace, ...args);
  }

  public debug(...args: unknown[]) {
    this.log(LogLevel.Debug, ...args);
  }

  public info(...args: unknown[]) {
    this.log(LogLevel.Info, ...args);
  }

  public warn(...args: unknown[]) {
    this.log(LogLevel.Warn, ...args);
  }

  public error(...args: unknown[]) {
    this.log(LogLevel.Error, ...args);
  }

  public fatal(...args: unknown[]) {
    this.log(LogLevel.Fatal, ...args);
  }
}
