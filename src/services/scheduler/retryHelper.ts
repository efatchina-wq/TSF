/**
 * Retry helper with exponential backoff
 * Executes an asynchronous operation, retrying on failure up to maxRetries.
 * Never throws unhandled exceptions that would crash the wider batch loop.
 */

export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  backoffMultiplier?: number;
  onRetry?: (attempt: number, error: Error, delayMs: number) => void;
}

export interface RetryResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
  attempts: number;
  totalDelayMs: number;
}

export async function executeWithRetry<T>(
  taskName: string,
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<RetryResult<T>> {
  const maxRetries = options.maxRetries ?? 3;
  const initialDelay = options.initialDelayMs ?? 400;
  const multiplier = options.backoffMultiplier ?? 2;

  let currentDelay = initialDelay;
  let attempts = 0;
  let totalDelayMs = 0;
  let lastError: Error = new Error(`Échec de la tâche « ${taskName} » sans message spécifique.`);

  while (attempts < maxRetries) {
    attempts++;
    try {
      const data = await fn();
      return {
        success: true,
        data,
        attempts,
        totalDelayMs
      };
    } catch (err: any) {
      lastError = err instanceof Error ? err : new Error(String(err));
      
      // If we haven't reached max retries, wait with backoff
      if (attempts < maxRetries) {
        options.onRetry?.(attempts, lastError, currentDelay);
        await new Promise(res => setTimeout(res, currentDelay));
        totalDelayMs += currentDelay;
        currentDelay = Math.round(currentDelay * multiplier);
      }
    }
  }

  // Exhausted all retries
  return {
    success: false,
    error: lastError,
    attempts,
    totalDelayMs
  };
}
