Create a React ripple button (Material style): on pointerdown, spawn a
white circle (0.35 opacity) at the click coordinates inside the overflow-
hidden button, animate it to scale 3 and fade out over 0.6s ease-out, then
remove it from the DOM. Support multiple concurrent ripples and keyboard
activation (Enter/Space) rippling from center. Track click position with
getBoundingClientRect.