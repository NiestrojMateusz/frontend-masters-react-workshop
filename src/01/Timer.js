import * as React from 'react';
import { useReducer } from 'react';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProgressCircle } from '../ProgressCircle';

// Import the timer machine and its initial state:
import { timerMachine } from './timerMachine';
import { useMachine } from '@xstate/react';

export const Timer = () => {
  const [state, send] = useMachine(timerMachine, "idle");

  const status = state.value;

  const duration = 60;
  const elapsed = 0;
  const interval = 0.1;

  return (
    <div
      className="timer"
      data-state={status}
      style={{
        // @ts-ignore
        '--duration': duration,
        '--elapsed': elapsed,
        '--interval': interval,
      }}
    >
      <header>
        <h1>Exercise 01</h1>
      </header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{status}</div>
        <div
          className="elapsed"
          onClick={() => {
            if (status !== 'running') {
            send({ type: 'TOGGLE' });
            }
          }}
        >
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          {status === 'paused' && <button
            onClick={() => {
              send({ type: 'RESET' });
            }}
          >
            Reset
          </button>}
        </div>
      </div>
      <div className="actions">
        {status === 'running' && <button
          onClick={() => {
              send({ type: 'TOGGLE' });
          }}
          title="Pause timer"
        >
          <FontAwesomeIcon icon={faPause} />
        </button>}

        {(status === 'idle' || status === 'paused') && <button
          onClick={() => {
            send({ type: 'TOGGLE' });
          }}
          title="Start timer"
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>}
      </div>
    </div>
  );
};
