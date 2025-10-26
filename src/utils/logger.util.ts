import fs from "fs";
import path from "path";

/**
 * Logger utility for date-based log file management
 * Creates logs in logs/YYYY-MM-DD/ directory structure
 */
export class Logger {
  private logDir: string;
  private dateFolder: string;
  private logFile: string;

  constructor(logName: string = "app") {
    const today = this.getDateString();
    this.logDir = path.join(process.cwd(), "logs", today);
    this.dateFolder = today;
    this.logFile = path.join(this.logDir, `${logName}.log`);

    // Create log directory if it doesn't exist
    this.ensureLogDirectory();
  }

  /**
   * Get current date string in YYYY-MM-DD format
   */
  private getDateString(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  /**
   * Get current timestamp string
   */
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Ensure log directory exists
   */
  private ensureLogDirectory(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  /**
   * Write log message to file
   */
  private writeLog(level: string, message: string, data?: any): void {
    const timestamp = this.getTimestamp();
    let logMessage = `[${timestamp}] [${level}] ${message}`;

    if (data !== undefined) {
      if (typeof data === "object") {
        logMessage += `\n${JSON.stringify(data, null, 2)}`;
      } else {
        logMessage += ` ${data}`;
      }
    }

    logMessage += "\n";

    // Write to file
    fs.appendFileSync(this.logFile, logMessage, "utf8");
  }

  /**
   * Log info message (also prints to console)
   */
  info(message: string, data?: any): void {
    console.log(message, data !== undefined ? data : "");
    this.writeLog("INFO", message, data);
  }

  /**
   * Log error message (also prints to console)
   */
  error(message: string, error?: any): void {
    console.error(message, error !== undefined ? error : "");

    // Extract error details if it's an Error object
    const errorData = error instanceof Error
      ? {
          message: error.message,
          stack: error.stack,
          name: error.name,
        }
      : error;

    this.writeLog("ERROR", message, errorData);
  }

  /**
   * Log warning message (also prints to console)
   */
  warn(message: string, data?: any): void {
    console.warn(message, data !== undefined ? data : "");
    this.writeLog("WARN", message, data);
  }

  /**
   * Log debug message (also prints to console)
   */
  debug(message: string, data?: any): void {
    console.log(`[DEBUG] ${message}`, data !== undefined ? data : "");
    this.writeLog("DEBUG", message, data);
  }

  /**
   * Log success message with ✅ emoji (also prints to console)
   */
  success(message: string, data?: any): void {
    console.log(`✅ ${message}`, data !== undefined ? data : "");
    this.writeLog("SUCCESS", message, data);
  }

  /**
   * Get current log file path
   */
  getLogFilePath(): string {
    return this.logFile;
  }

  /**
   * Get current date folder
   */
  getDateFolder(): string {
    return this.dateFolder;
  }
}

/**
 * Create a logger instance for a specific module
 */
export function createLogger(logName: string): Logger {
  return new Logger(logName);
}

// Default logger instance
export const logger = new Logger("app");
