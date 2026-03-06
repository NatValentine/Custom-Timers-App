import { presets } from "./presets.js";
import { Circuit } from "./timer.js";

let activeCircuit: Circuit | null = null;
let currentStepIndex = 0;
let intervalId: number | null = null;
let remainingTime = 0;

const presetsContainer = document.getElementById(
  "presets-container",
) as HTMLDivElement;
const timerDisplay = document.getElementById(
  "timer-display",
) as HTMLHeadingElement;
const currentTimerDiv = document.getElementById(
  "current-timer",
) as HTMLDivElement;
const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
const stopBtn = document.getElementById("stop-btn") as HTMLButtonElement;

function playBeep() {
  const audioContext = new (
    window.AudioContext || (window as any).webkitAudioContext
  )();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.2);
}

presets.forEach((preset) => {
  const button = document.createElement("button");
  button.textContent = preset.name;
  button.addEventListener("click", () => {
    selectPreset(preset);
    button.classList.add("active");
  });
  presetsContainer.appendChild(button);
});

function selectPreset(circuit: Circuit) {
  document.querySelectorAll("#presets-container button").forEach((btn) => {
    btn.classList.remove("active");
  });

  currentTimerDiv.classList.remove("hidden");

  activeCircuit = {
    ...circuit,
    steps: circuit.steps.map((step) => ({ ...step })),
  };
  currentStepIndex = 0;
  remainingTime = activeCircuit.steps[0].time;
  render();
  stopTimer();
}

function render() {
  if (!activeCircuit) return;

  const existingSteps = currentTimerDiv.querySelectorAll(".step");
  existingSteps.forEach((step) => step.remove());

  activeCircuit.steps.forEach((step, index) => {
    const stepDiv = document.createElement("div");
    stepDiv.className = "step";
    if (index === currentStepIndex) {
      stepDiv.classList.add("current");
    }
    const label = step.label || `Step ${index + 1}`;
    const timeStr = formatTime(step.time);
    stepDiv.textContent = `${label}: ${timeStr}`;
    currentTimerDiv.appendChild(stepDiv);
  });

  timerDisplay.textContent = formatTime(remainingTime);
}

// Format time as MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

startBtn.addEventListener("click", () => {
  if (!activeCircuit || intervalId) return;

  playBeep();

  intervalId = window.setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      if (remainingTime === 0) {
        playBeep();
        timerDisplay.classList.add("timer-flash");
        setTimeout(() => timerDisplay.classList.remove("timer-flash"), 500);
      }
      render();
    } else {
      nextStep();
    }
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  stopTimer();
});

function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function nextStep() {
  if (!activeCircuit) return;

  currentStepIndex++;
  if (currentStepIndex >= activeCircuit.steps.length) {
    if (activeCircuit.isRepeatable && activeCircuit.repetitions !== null) {
      const reps = activeCircuit.repetitions!;
      if (reps === 0) {
        // Infinite reps
        currentStepIndex = 0;
      } else if (reps > 0) {
        activeCircuit.repetitions = reps - 1;
        currentStepIndex = 0;
      } else {
        stopTimer();
        return;
      }
    } else {
      playBeep();
      stopTimer();
      return;
    }
  }

  remainingTime = activeCircuit.steps[currentStepIndex].time;
  render();
}
