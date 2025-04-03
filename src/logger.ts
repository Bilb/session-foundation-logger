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

export type ScopeType = `[${string}]`;

export class Logger {
  private static loggers: Map<ScopeType, LogFn> = new Map();

  static setLogFn(scope: ScopeType, logFn: LogFn) {
    if (Logger.loggers.has(scope)) {
      throw new Error('Logger already initialised');
    }
    Logger.loggers.set(scope, logFn);
  }

  private static getLogFn(scope: ScopeType): LogFn {
    const fn = Logger.loggers.get(scope);
    if (!fn) {
      throw new Error(`Logger not initialized for scope "${scope}"`);
    }
    return fn;
  }

  static for(scope: ScopeType) {
    const call =
      (level: LogLevel) =>
      (...args: unknown[]) => {
        Logger.getLogFn(scope)(level, scope, ...args);
      };

    return {
      trace: call(LogLevel.Trace),
      debug: call(LogLevel.Debug),
      info: call(LogLevel.Info),
      warn: call(LogLevel.Warn),
      error: call(LogLevel.Error),
      fatal: call(LogLevel.Fatal),
    };
  }
}
