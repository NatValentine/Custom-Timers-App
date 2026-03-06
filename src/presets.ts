import { Circuit } from "./timer";

const fiveMinutes: Circuit = {
  name: "Just try for 5 minutes",
  steps: [{ time: 5 * 60, running: false }],
  isRepeatable: false,
};

const noodles: Circuit = {
  name: "Noodles",
  steps: [{ time: 8 * 60, running: false }],
  isRepeatable: false,
};

const boilingEgg: Circuit = {
  name: "Boiling Egg",
  steps: [{ time: 15 * 60, running: false }],
  isRepeatable: false,
};

const thirtyMinutes: Circuit = {
  name: "30 Minutes",
  steps: [{ time: 30 * 60, running: false }],
  isRepeatable: false,
};

const anHour: Circuit = {
  name: "An Hour",
  steps: [{ time: 60 * 60, running: false }],
  isRepeatable: false,
};

const breathingExercise: Circuit = {
  name: "Breathing Exercise",
  steps: [
    { label: "Inhale", time: 4, running: false },
    { label: "Hold", time: 4, running: false },
    { label: "Exhale", time: 4, running: false },
    { label: "Hold", time: 4, running: false },
  ],
  isRepeatable: true,
  repetitions: 0, // infinite
};

const stretching: Circuit = {
  name: "Stretching",
  steps: [{ time: 30, running: false }],
  isRepeatable: true,
  repetitions: 0, // infinite
};

const pomodoro: Circuit = {
  name: "Pomodoro",
  steps: [
    {
      label: "Work",
      time: 25 * 60,
      running: false,
    },
    {
      label: "Break",
      time: 5 * 60,
      running: false,
    },
  ],
  isRepeatable: true,
  repetitions: 4,
};

const boxing: Circuit = {
  name: "Boxing Rounds",
  steps: [
    {
      label: "Round",
      time: 3 * 60,
      running: false,
    },
    {
      label: "Rest",
      time: 1 * 60,
      running: false,
    },
  ],
  isRepeatable: true,
  repetitions: 12,
};

const archery: Circuit = {
  name: "Archery Practice",
  steps: [
    {
      label: "Set up",
      time: 10,
      running: false,
    },
    {
      label: "Draw",
      time: 5,
      running: false,
    },
    {
      label: "Hold",
      time: 10,
      running: false,
    },
    {
      label: "Release",
      time: 5,
      running: false,
    },
  ],
  isRepeatable: true,
  repetitions: 3,
};

export const presets: Circuit[] = [
  fiveMinutes,
  noodles,
  boilingEgg,
  thirtyMinutes,
  anHour,
  breathingExercise,
  stretching,
  pomodoro,
  boxing,
  archery,
];
