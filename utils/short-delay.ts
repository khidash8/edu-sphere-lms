/**
 * Creates a delay for the specified number of milliseconds
 * @param ms - Number of milliseconds to delay (default: 1000ms)
 * @returns Promise that resolves after the specified delay
 */
export const delay = (ms: number = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Short delay function with predefined common delays
 */
export const shortDelay = {
  /** 100ms delay */
  tiny: () => delay(100),

  /** 250ms delay */
  short: () => delay(250),

  /** 500ms delay */
  medium: () => delay(500),

  /** 1000ms delay */
  long: () => delay(1000),

  /** Custom delay */
  custom: (ms: number) => delay(ms),
};

// Usage examples:

// Basic delay
// await delay(500); // 500ms delay

// Using shortDelay
// await shortDelay.tiny();    // 100ms
// await shortDelay.short();   // 250ms
// await shortDelay.medium();  // 500ms
// await shortDelay.long();    // 1000ms
// await shortDelay.custom(750); // 750ms

// In an async function:
/*
async function example() {
  console.log('Starting...');

  await delay(1000); // Wait 1 second
  console.log('After 1 second');

  await shortDelay.short(); // Wait 250ms
  console.log('After short delay');
}
*/
