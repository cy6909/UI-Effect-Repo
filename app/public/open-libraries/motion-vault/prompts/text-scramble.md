Create a React text-scramble component. When triggered, each character of
the target string cycles through random glyphs from the set "!<>-_\\/[]{}=+*^?#"
every 30ms, then locks into the correct character left-to-right, finishing
the full string in ~1.4s. Expose a trigger function and an optional
useInView auto-trigger. Monospace font, Tailwind styling.