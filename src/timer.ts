export interface Repeatable {
  isRepeatable: boolean;
  repetitions?: number; // 0 for infinite
}

export interface Timer {
  label?: string;
  time: number; // Time in seconds
  running: boolean;
}

export type Circuit = Repeatable & {
  name: string;
  steps: Timer[];
};
