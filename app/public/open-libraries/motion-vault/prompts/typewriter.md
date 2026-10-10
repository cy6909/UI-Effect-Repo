Create a React typewriter component with TypeScript. It cycles through an
array of phrases: types each character at 90ms intervals, pauses 1.6s when
complete, deletes at 40ms per character, then types the next phrase. Render
a blinking block cursor (2px wide, 530ms blink) after the text. Pure React
state + setTimeout, no libraries. Tailwind styling, monospace optional.