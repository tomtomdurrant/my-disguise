import chalk from "chalk";
import type {ChalkInstance} from 'chalk';
import util from "node:util";

type LogLevel = "error" | "warn" | "info" | "debug" | "silly";
type Module = "server" | "ws" | "osc" | "browser";

interface LoggerOptions {
  timestamp?: boolean;
  level?: LogLevel;
}

export class Logger {
  private levelColors: Record<LogLevel, ChalkInstance> = {
    error: chalk.red,
    warn: chalk.yellow,
    info: chalk.blue,
    debug: chalk.gray,
    silly: chalk.redBright,
  };

  private moduleColors: Record<Module, ChalkInstance> = {
    server: chalk.cyan,
    ws: chalk.magenta,
    osc: chalk.green,
    browser: chalk.white,
  };
  private levelPriority: Record<LogLevel, number> = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    silly: 4,
  };

  private useTimestamp: boolean;
  private maxModuleLength: number;
  private maxLevelLength: number;
  private currentLevel: LogLevel;

  constructor(options: LoggerOptions = {}) {
    this.useTimestamp = options.timestamp !== false;
    this.maxModuleLength =
      Math.max(...Object.keys(this.moduleColors).map((m) => m.length)) + 2;
    this.maxModuleLength =
      Math.max(...Object.keys(this.moduleColors).map((m) => m.length)) + 2;
    this.maxLevelLength =
      Math.max(...Object.keys(this.levelColors).map((l) => l.length)) + 2;
    this.currentLevel = options.level || "debug";
  }
  setLevel(level: LogLevel): void {
    this.currentLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return this.levelPriority[level] <= this.levelPriority[this.currentLevel];
  }

  private formatMessage(
    module: Module,
    level: LogLevel,
    message: string,
    ...objects: any[]
  ): string {
    const timestamp = this.useTimestamp ? `${new Date().toISOString()} ` : "";
    const moduleColor = this.moduleColors[module];
    const levelColor = this.levelColors[level];
    const paddedModule = `[${module.toUpperCase()}]`.padEnd(
      this.maxModuleLength
    );
    const paddedLevel = `[${level.toUpperCase()}]`.padEnd(this.maxLevelLength);
    const modulePrefix = moduleColor(paddedModule);
    const levelPrefix = levelColor(paddedLevel);
    let formattedMessage = `${timestamp}${levelPrefix} ${modulePrefix} - ${message}`;
    if (objects.length > 0) {
      formattedMessage +=
        "\n" +
        objects
          .map((obj) => util.inspect(obj, { colors: true, depth: null }))
          .join("\n");
    }
    return formattedMessage;
  }

  private log(
    module: Module,
    level: LogLevel,
    message: string,
    ...objects: any[]
  ): void {
    if (this.shouldLog(level)) {
      console.log(this.formatMessage(module, level, message, ...objects));
    }
  }

  error(module: Module, message: string, error?: unknown): void {
    this.log(module, "error", message);
    if (error instanceof Error) {
      console.error(chalk.red(error.stack));
    }
  }

  warn(module: Module, message: string): void {
    this.log(module, "warn", message);
  }

  info(module: Module, message: string): void {
    this.log(module, "info", message);
  }

  debug(module: Module, message: string): void {
    this.log(module, "debug", message);
  }
  silly(module: Module, message: string, ...objects: any[]): void {
    this.log(module, "silly", message, ...objects);
  }
}
