const RING_RADII = [32, 46, 58];
const RING_CAPACITY = [6, 10, 14];

export function orbitPositions(n) {
  const positions = [];
  let remaining = n;
  let ringIndex = 0;

  while (remaining > 0) {
    const capacity = RING_CAPACITY[Math.min(ringIndex, RING_CAPACITY.length - 1)];
    const count = Math.min(remaining, capacity);
    const radius = RING_RADII[Math.min(ringIndex, RING_RADII.length - 1)];

    for (let i = 0; i < count; i++) {
      const angle = (360 / count) * i - 90;
      const rad = (angle * Math.PI) / 180;
      positions.push({
        x: 50 + radius * Math.cos(rad),
        y: 50 + radius * Math.sin(rad),
      });
    }
    remaining -= count;
    ringIndex += 1;
  }
  return positions;
}
