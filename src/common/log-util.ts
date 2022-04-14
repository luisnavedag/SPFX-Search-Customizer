export default class Logger {
    public static info (source: string, msg: string): void {
        console.log(`[${source}] ${msg}`);
    }
}

