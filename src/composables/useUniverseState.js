import { reactive } from 'vue';

const state = reactive({
  isNetworkActive: true, // First universe is active by default
  isWebActive: false,
  isDataActive: false,
});

export function useUniverseState() {
  const setNetworkActive = (value) => {
    state.isNetworkActive = value;
  };

  const setWebActive = (value) => {
    state.isWebActive = value;
  };

  const setDataActive = (value) => {
    state.isDataActive = value;
  };

  return {
    state,
    setNetworkActive,
    setWebActive,
    setDataActive,
  };
}
