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

let logAtLevel: LogAtLevelFnType = () => {};
let hasInitialized = false;

export const trace: LogFn = (...args) => logAtLevel(LogLevel.Trace, ...args);
export const debug: LogFn = (...args) => logAtLevel(LogLevel.Debug, ...args);
export const info: LogFn = (...args) => logAtLevel(LogLevel.Info, ...args);
export const warn: LogFn = (...args) => logAtLevel(LogLevel.Warn, ...args);
export const error: LogFn = (...args) => logAtLevel(LogLevel.Error, ...args);
export const fatal: LogFn = (...args) => logAtLevel(LogLevel.Fatal, ...args);

export function setLogAtLevel(log: LogAtLevelFnType): void {
  if (hasInitialized) {
    throw new Error('Logger has already been initialized');
  }
  logAtLevel = log;
  hasInitialized = true;
}
