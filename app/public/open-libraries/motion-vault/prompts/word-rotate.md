Create a React word-rotate component with Framer Motion: a fixed sentence
contains one rotating word that cycles through a list every 2.2s. Outgoing
word slides up and fades, incoming word slides in from below (both 0.4s
ease-in-out) inside a fixed-height overflow-hidden inline container with
AnimatePresence. Clicking advances to the next word immediately.