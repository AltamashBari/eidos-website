"use client";

import { useEffect, useRef } from "react";

/**
 * A minimal interruptible spring, driven by requestAnimationFrame.
 *
 * Why this exists rather than a CSS transition: Apple's *Designing Fluid
 * Interfaces* calls interruptibility "the single most important principle."
 * A CSS transition has a fixed duration and always runs to completion — grab
 * a half-open drawer and you must wait it out. A spring has no duration; it
 * has a *target*. Re-targeting mid-flight keeps the current position AND the
 * current velocity, so reversing feels continuous instead of hitting a wall.
 *
 * Parameterised the way Apple exposes springs to designers, not the physics
 * triplet (mass/stiffness/damping):
 *   - `damping`  1.0 = critically damped, no overshoot. < 1.0 bounces.
 *   - `response` seconds to reach the target. Not a duration — settle time
 *                emerges from the parameters.
 *
 * Apple's shipped drawer values are damping 0.8 / response 0.3.
 */
export function useSpring(
  target: number,
  { damping = 1, response = 0.3 }: { damping?: number; response?: number } = {},
  onFrame?: (value: number) => void,
) {
  const value = useRef(target);
  const velocity = useRef(0);
  const frame = useRef(0);
  const last = useRef(0);
  const cb = useRef(onFrame);
  cb.current = onFrame;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Reduced motion: no spring, no overshoot — snap and report once.
    if (reduced.matches) {
      value.current = target;
      velocity.current = 0;
      cb.current?.(target);
      return;
    }

    const zeta = damping;
    const omega = (2 * Math.PI) / response; // undamped natural frequency
    last.current = 0;

    const step = (now: number) => {
      const dt = last.current ? Math.min((now - last.current) / 1000, 1 / 30) : 1 / 60;
      last.current = now;

      // Standard damped-spring integration. Critically important detail:
      // this always starts from `value.current` — the live presentation
      // value — so an interrupt never causes a visible jump.
      const displacement = value.current - target;
      const accel = -omega * omega * displacement - 2 * zeta * omega * velocity.current;
      velocity.current += accel * dt;
      value.current += velocity.current * dt;

      const settled = Math.abs(value.current - target) < 0.001 && Math.abs(velocity.current) < 0.01;
      if (settled) {
        value.current = target;
        velocity.current = 0;
        cb.current?.(value.current);
        frame.current = 0;
        return;
      }

      cb.current?.(value.current);
      frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = 0;
      // NOTE: value.current and velocity.current are deliberately NOT reset.
      // Carrying both across a re-target is what makes reversal continuous.
    };
  }, [target, damping, response]);

  return value;
}
