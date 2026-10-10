Create a React stacking-cards effect inside a scrollable container (320px,
overflow-y scroll). Four cards are position sticky at top 16px; as scroll
progress pushes a new card up, the covered card scales to 0.94 and dims to
brightness 0.96. Drive progress with GSAP ScrollTrigger using the container
as scroller (or a scroll handler + math). Each card: white, 1px border,
rounded-12, numbered 01-04.