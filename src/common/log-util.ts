export enum LogLevel {
    Information = 2,
    Warning = 1,
    Error = 0,
    Verbose = 16
}

type LogInfoMessage = string | object;

export function info(moduleName: string, source: string, msg: LogInfoMessage, currentLogLevel: LogLevel = LogLevel.Information): void {

    if (currentLogLevel && LogLevel.Information) {
        let path = `${moduleName}->${source}`;

        if (typeof (msg) == 'object') {
            console.log(`[${path}]`);
            console.log(msg);
        } else {
            console.log(`[${path}]: ${msg}`);
        }
    }
}

export function warn(moduleName: string, source: string, msg: LogInfoMessage, currentLogLevel: LogLevel = LogLevel.Information): void {

    if (currentLogLevel && LogLevel.Warning) {
        let path = `${moduleName}->${source}`;

        if (typeof (msg) == 'object') {
            console.warn(`[${path}]`);
            console.warn(msg);
        } else {
            console.warn(`[${path}]: ${msg}`);
        }
    }
}

