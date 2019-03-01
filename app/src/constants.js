export const SharedMemoryConstants = {
  shm_name: "/Seeq",
  num_elements: 2,
  element_size: 20480,
  num_consumers: 1
}

export const TimingConstants = {
  maxbpm: 4096,
  ppqn: 512
};

export const MusicalConstants = {
  note: {
    'whole': {
      noteValueToTickMultiplier: 4,
      stepsPerBar: 1
    },
    '1/2': {
      noteValueToTickMultiplier: 2,
      stepsPerBar: 2
    },
    '1/2.t': {
      noteValueToTickMultiplier: 1,
      stepsPerBar: 3
    },
    '1/4': {
      noteValueToTickMultiplier: 1,
      stepsPerBar: 4
    },
    '1/4.t': {
      noteValueToTickMultiplier: 0.5,
      stepsPerBar: 6
    },
    '1/8': {
      noteValueToTickMultiplier: 0.5,
      stepsPerBar: 8
    },
    '1/8.t': {
      noteValueToTickMultiplier: 0.25,
      stepsPerBar: 12
    },
    '1/16': {
      noteValueToTickMultiplier: 0.25,
      stepsPerBar: 16
    },
    '1/16.t': {
      noteValueToTickMultiplier: 0.125,
      stepsPerBar: 24
    },
    '1/32': {
      noteValueToTickMultiplier: 0.125,
      stepsPerBar: 32
    },
    '1/32.t': {
      noteValueToTickMultiplier: 0.0625,
      stepsPerBar: 48
    },
    '1/64': {
      noteValueToTickMultiplier: 0.0625,
      stepsPerBar: 64
    },
    '1/64.t': {
      noteValueToTickMultiplier: 0.03125,
      stepsPerBar: 96
    },
    '1/128': {
      noteValueToTickMultiplier: 0.03125,
      stepsPerBar: 128
    }
  }
};
