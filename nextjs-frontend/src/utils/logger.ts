// Professional logging utility for production applications
// Replaces console.log statements with structured logging

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
  component?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isClient = typeof window !== 'undefined';

  private formatMessage(level: LogLevel, message: string, data?: any, component?: string): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      component,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    // In production, only log warnings and errors
    if (!this.isDevelopment) {
      return level === 'warn' || level === 'error';
    }
    return true;
  }

  private output(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) return;

    const prefix = `[${entry.timestamp}] ${entry.level.toUpperCase()}${entry.component ? ` [${entry.component}]` : ''}:`;
    
    switch (entry.level) {
      case 'error':
        console.error(prefix, entry.message, entry.data || '');
        break;
      case 'warn':
        console.warn(prefix, entry.message, entry.data || '');
        break;
      case 'info':
        console.info(prefix, entry.message, entry.data || '');
        break;
      case 'debug':
        console.log(prefix, entry.message, entry.data || '');
        break;
    }

    // In production, you could send to logging service here
    // e.g., Sentry, DataDog, CloudWatch, etc.
    if (!this.isDevelopment && this.isClient && entry.level === 'error') {
      // Example: Send to error tracking service
      // errorTrackingService.captureException(entry);
    }
  }

  debug(message: string, data?: any, component?: string): void {
    this.output(this.formatMessage('debug', message, data, component));
  }

  info(message: string, data?: any, component?: string): void {
    this.output(this.formatMessage('info', message, data, component));
  }

  warn(message: string, data?: any, component?: string): void {
    this.output(this.formatMessage('warn', message, data, component));
  }

  error(message: string, error?: any, component?: string): void {
    this.output(this.formatMessage('error', message, error, component));
  }

  // Specialized methods for common use cases
  apiRequest(method: string, url: string, data?: any): void {
    this.debug(`API ${method.toUpperCase()} request`, { url, data }, 'API');
  }

  apiResponse(method: string, url: string, status: number, data?: any): void {
    this.debug(`API ${method.toUpperCase()} response`, { url, status, data }, 'API');
  }

  apiError(method: string, url: string, error: any): void {
    this.error(`API ${method.toUpperCase()} failed`, { url, error }, 'API');
  }

  userAction(action: string, data?: any): void {
    this.info(`User action: ${action}`, data, 'USER');
  }

  componentMount(componentName: string): void {
    this.debug(`Component mounted: ${componentName}`, undefined, componentName);
  }

  componentUnmount(componentName: string): void {
    this.debug(`Component unmounted: ${componentName}`, undefined, componentName);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export types for use in other files
export type { LogLevel, LogEntry };
