import { createMachine, assign } from 'xstate';

export const timerMachine = createMachine({
  initial: 'idle',
  // Add initial context
  // ...
  context: {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  },
  states: {
    idle: {
      // Reset duration and elapsed on entry
      // ...
      entry: assign({
        duration: 60,
        elapsed: 0,
        interval: 0.1,
      }),
      on: {
        TOGGLE: 'running',
      },
    },
    running: {
      on: {
        TOGGLE: 'paused',
        ADD_MINUTE: {
          actions: assign({
            duration: (context) => context.duration + 60,
          }),
        },
      },
    },
    paused: {
      on: {
        TOGGLE: 'running',
        RESET: 'idle',
      },
    },
  },
});
