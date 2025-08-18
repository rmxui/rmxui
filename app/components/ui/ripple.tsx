import { useRef } from "react";
import { cn } from "~/lib/utils";

const EASING = {
  STANDARD: "cubic-bezier(0.2, 0, 0, 1)",
  STANDARD_ACCELERATE: "cubic-bezier(.3,0,1,1)",
  STANDARD_DECELERATE: "cubic-bezier(0,0,0,1)",
  EMPHASIZED: "cubic-bezier(.3,0,0,1)",
  EMPHASIZED_ACCELERATE: "cubic-bezier(.3,0,.8,.15)",
  EMPHASIZED_DECELERATE: "cubic-bezier(.05,.7,.1,1)",
} as const;

const PRESS_GROW_MS = 450;
const MINIMUM_PRESS_MS = 225;
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const PRESS_PSEUDO = "::after";
const ANIMATION_FILL = "forwards";

/**
 * Initial state of the control, no touch in progress.
 *
 * Transitions:
 *   - on touch down: transition to `TOUCH_DELAY`.
 *   - on mouse down: transition to `WAITING_FOR_CLICK`.
 */
const INACTIVE = "INACTIVE";
/**
 * Touch down has been received, waiting to determine if it's a swipe or
 * scroll.
 *
 * Transitions:
 *   - on touch up: begin press; transition to `WAITING_FOR_CLICK`.
 *   - on cancel: transition to `INACTIVE`.
 *   - after `TOUCH_DELAY_MS`: begin press; transition to `HOLDING`.
 */
const TOUCH_DELAY = "TOUCH_DELAY";
/**
 * A touch has been deemed to be a press
 *
 * Transitions:
 *  - on up: transition to `WAITING_FOR_CLICK`.
 */
const HOLDING = "HOLDING";
/**
 * The user touch has finished, transition into rest state.
 *
 * Transitions:
 *   - on click end press; transition to `INACTIVE`.
 */
const WAITING_FOR_CLICK = "WAITING_FOR_CLICK";

/**
 * Delay reacting to touch so that we do not show the ripple for a swipe or
 * scroll interaction.
 */
const TOUCH_DELAY_MS = 150;

function isTouch({ pointerType }: RipplePointerEvent) {
  return pointerType === "touch";
}

type RipplePointerEvent = React.PointerEvent<HTMLSpanElement> & PointerEvent;
export type RippleProps = React.ComponentProps<"span"> & {
  disabled?: boolean;
  plain?: boolean;
};

export function Ripple({
  className,
  disabled = false,
  plain = false,
}: RippleProps) {
  if (disabled) return null;

  const rippleSize = useRef("");
  const rippleScale = useRef("");
  const initialSize = useRef(0);
  const growAnimation = useRef<Animation>(null);
  const state = useRef(INACTIVE);
  const rippleStartEvent = useRef<RipplePointerEvent>(null);
  const checkBoundsAfterContextMenu = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  function handlePointerEnter(event: RipplePointerEvent) {
    if (!shouldReactToEvent(event)) {
      return;
    } // hovered = true;
  }

  function handlePointerLeave(event: RipplePointerEvent) {
    if (!shouldReactToEvent(event)) {
      return;
    } //hovered = false;
    // release a held mouse or pen press that moves outside the element

    if (state.current !== INACTIVE) {
      endPressAnimation();
    }
  }

  function handlePointerUp(event: RipplePointerEvent) {
    if (!shouldReactToEvent(event)) {
      return;
    }

    if (state.current === HOLDING) {
      state.current = WAITING_FOR_CLICK;
      return;
    }

    if (state.current === TOUCH_DELAY) {
      state.current = WAITING_FOR_CLICK;
      startPressAnimation(rippleStartEvent.current as any);
      return;
    }
  }

  async function handlePointerDown(event: RipplePointerEvent) {
    if (!shouldReactToEvent(event)) {
      return;
    }

    rippleStartEvent.current = event;
    if (!isTouch(event)) {
      state.current = WAITING_FOR_CLICK;
      startPressAnimation(event);
      return;
    } // after a longpress contextmenu event, an extra `pointerdown` can be
    // dispatched to the pressed element. Check that the down is within
    // bounds of the element in this case.

    if (checkBoundsAfterContextMenu.current && !inBounds(event)) {
      return;
    }

    checkBoundsAfterContextMenu.current = false; // Wait for a hold after touch delay

    state.current = TOUCH_DELAY;
    await new Promise((resolve) => {
      setTimeout(resolve, TOUCH_DELAY_MS);
    });

    if (state.current !== TOUCH_DELAY) {
      return;
    }

    state.current = HOLDING;
    startPressAnimation(event);
  }

  function handleClick() {
    // Click is a MouseEvent in Firefox and Safari, so we cannot use
    // `shouldReactToEvent`
    if (disabled) {
      return;
    }

    if (state.current === WAITING_FOR_CLICK) {
      endPressAnimation();
      return;
    }

    if (state.current === INACTIVE) {
      // keyboard synthesized click event
      startPressAnimation();
      endPressAnimation();
    }
  }

  function handlePointerCancel(event: RipplePointerEvent) {
    if (!shouldReactToEvent(event)) {
      return;
    }

    endPressAnimation();
  }

  function handleContextMenu() {
    if (disabled) {
      return;
    }

    checkBoundsAfterContextMenu.current = true;
    endPressAnimation();
  }

  function determineRippleSize() {
    const { height, width } = ref.current?.getBoundingClientRect() || {
      height: 0,
      width: 0,
    };
    const maxDim = Math.max(height, width);
    const softEdgeSize = Math.max(
      SOFT_EDGE_CONTAINER_RATIO * maxDim,
      SOFT_EDGE_MINIMUM_SIZE,
    );

    const _initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
    const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
    const maxRadius = hypotenuse + PADDING;

    initialSize.current = _initialSize;
    rippleScale.current = `${(maxRadius + softEdgeSize) / _initialSize}`;
    rippleSize.current = `${_initialSize}px`;
  }

  function getNormalizedPointerEventCoords(pointerEvent: RipplePointerEvent): {
    x: number;
    y: number;
  } {
    const { scrollX, scrollY } = window;
    const { left, top } = ref.current?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };
    const documentX = scrollX + left;
    const documentY = scrollY + top;
    const { pageX, pageY } = pointerEvent;
    return { x: pageX - documentX, y: pageY - documentY };
  }

  function getTranslationCoordinates(positionEvent?: RipplePointerEvent) {
    const { height, width } = ref.current?.getBoundingClientRect() || {
      height: 0,
      width: 0,
    }; // end in the center
    const endPoint = {
      x: (width - initialSize.current) / 2,
      y: (height - initialSize.current) / 2,
    };

    let startPoint;
    if (positionEvent) {
      startPoint = getNormalizedPointerEventCoords(positionEvent);
    } else {
      startPoint = {
        x: width / 2,
        y: height / 2,
      };
    } // center around start point

    startPoint = {
      x: startPoint.x - initialSize.current / 2,
      y: startPoint.y - initialSize.current / 2,
    };

    return { startPoint, endPoint };
  }

  function startPressAnimation(positionEvent?: RipplePointerEvent) {
    if (!ref.current || !positionEvent) {
      return;
    } // pressed = true;

    growAnimation.current?.cancel();
    determineRippleSize();
    const { startPoint, endPoint } = getTranslationCoordinates(positionEvent);
    const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
    const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;

    growAnimation.current = ref.current.animate(
      {
        top: [0, 0],
        left: [0, 0],
        height: [rippleSize.current, rippleSize.current],
        width: [rippleSize.current, rippleSize.current],
        transform: [
          `translate(${translateStart}) scale(1)`,
          `translate(${translateEnd}) scale(${rippleScale.current})`,
        ],
      },
      {
        pseudoElement: PRESS_PSEUDO,
        duration: PRESS_GROW_MS,
        easing: EASING.STANDARD,
        fill: ANIMATION_FILL,
      },
    );
  }

  async function endPressAnimation() {
    rippleStartEvent.current = null;
    state.current = INACTIVE;
    const animation = growAnimation.current;
    let pressAnimationPlayState = Infinity;
    if (typeof animation?.currentTime === "number") {
      pressAnimationPlayState = animation.currentTime;
    } else if (animation?.currentTime) {
      pressAnimationPlayState = animation.currentTime.to("ms").value;
    }

    if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
      // pressed = false;
      return;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
    });

    if (growAnimation.current !== animation) {
      // A new press animation was started. The old animation was canceled and
      // should not finish the pressed state.
      return;
    } // pressed = false;
  }

  function shouldReactToEvent(event: RipplePointerEvent) {
    if (disabled || !event.isPrimary) {
      return false;
    }

    if (
      rippleStartEvent.current &&
      rippleStartEvent.current.pointerId !== event.pointerId
    ) {
      return false;
    }

    if (event.type === "pointerenter" || event.type === "pointerleave") {
      return !isTouch(event);
    }

    const isPrimaryButton = event.buttons === 1;
    return isTouch(event) || isPrimaryButton;
  }

  /**
   * Check if the event is within the bounds of the element.
   *
   * This is only needed for the "stuck" contextmenu longpress on Chrome.
   */

  function inBounds({ x, y }: RipplePointerEvent) {
    const { top, left, bottom, right } =
      ref.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      };
    return x >= left && x <= right && y >= top && y <= bottom;
  }

  const props = plain
    ? {}
    : {
        onClick: handleClick,
        onContextMenu: handleContextMenu,
        onPointerCancel: handlePointerCancel,
        onPointerDown: handlePointerDown,
        onPointerEnter: handlePointerEnter,
        onPointerLeave: handlePointerLeave,
        onPointerUp: handlePointerUp,
      };

  return (
    <span
      ref={ref}
      data-slot="ripple"
      className={cn(
        "absolute inset-0 rounded-[inherit] overflow-hidden",
        "before:absolute before:inset-0 before:rounded-[inherit] before:content-[''] before:opacity-0",
        "before:transition-[opacity,background-color] before:duration-[15ms,15ms] before:ease-linear",
        "after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] after:opacity-0",
        "after:transition-[opacity,background-color]",
        !plain && [
          "after:bg-[radial-gradient(closest-side,var(--rm-ripple-color)_max(calc(100%-70px),65%),transparent_100%)]",
          "after:origin-[center_center] after:transition-[opacity_375ms_linear]",
        ],
        className,
      )}
      {...props}
    ></span>
  );
}
