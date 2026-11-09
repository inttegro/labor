# Motion and gesture mechanics

Use this reference when implementing gesture-driven motion. The constants below are starting points, not universal product values; tune them with real geometry, input devices, and content.

## Choosing the model

- Use an easing curve for a short transition with a fixed start, end, and duration.
- Use a spring for motion that must be interrupted, redirected, or connected to a gesture.
- Use inertial decay for free movement such as scrolling, then hand into a spring when the object reaches a snap point or boundary.

## Spring language

Two useful perceptual controls are:

- **Damping ratio**: `1` is critically damped, below `1` permits overshoot, and above `1` settles without overshoot but can feel heavy.
- **Response**: the approximate speed of the system's response, not a guaranteed animation duration.

Start ordinary controls without overshoot. Introduce a small amount only for interactions whose initiating gesture carries momentum.

## Velocity handoff

Estimate release velocity from several recent pointer samples rather than the last pair alone. Weight recent samples more heavily and reject samples separated by long pauses.

If an API expects velocity normalized to remaining distance:

```text
relativeVelocity = releaseVelocity / (target - current)
```

Guard the zero-distance case and confirm the library's units. Many web libraries accept absolute pixels per second instead.

## Momentum projection

For exponential decay with a per-millisecond deceleration rate `d`, one practical projection is:

```text
projectedDistance = (velocity / 1000) * d / (1 - d)
projectedPosition = currentPosition + projectedDistance
```

Choose the snap target nearest the projected position, then animate from the current rendered position with the measured release velocity. Tune `d` against the intended interaction; a value near `0.998` produces a long scroll-like glide, while a smaller value settles sooner.

## Progressive boundary resistance

A useful rubber-band mapping is:

```js
function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot));
}
```

Apply this only beyond the valid range. On release, spring to the boundary from the live rendered value.

## Pointer implementation

On pointer down:

1. record the pointer id and grab offset;
2. call `setPointerCapture`;
3. record position and timestamp samples;
4. show the pressed state immediately.

During movement:

1. update the rendered position from input;
2. preserve the grab offset;
3. constrain or rubber-band at boundaries;
4. update the sample history;
5. avoid layout reads after writes in the same frame.

On release or cancellation:

1. calculate stable velocity;
2. project the endpoint when momentum matters;
3. select a valid target;
4. hand current position and velocity to the settling behavior;
5. release pointer capture and clear transient state.

## Frame quality

- Schedule visual updates on the display clock.
- Prefer transform and opacity for continuous movement.
- Keep expensive layout, paint, and JavaScript work off the critical input path.
- Review adjacent-frame distance; motion can strobe even at a high reported frame rate when objects travel too far per frame.
- Avoid adding blur as a universal cure for poor motion. Use it only when it communicates speed and remains legible.

## Failure modes

- selecting a snap point from release position while ignoring velocity;
- starting from the logical target after interruption, causing a jump;
- blocking input until an animation callback fires;
- treating two-dimensional movement as one scalar spring;
- using decorative bounce on every transition;
- implementing only a final swipe event with no continuous feedback;
- making the gesture the only way to perform the action.
