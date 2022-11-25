## percy snapshot bug repro

[Presentation slides](/CSS-Variables-in-theming-support.pdf)

TL;DR: Due to Percy splitting workflow into:

- snapshot creation (on local machine or in CI) phase (when the UI is reverse engineered and packed to an `html` file)
- remote Percy screenshot phase when screenshots are created on Percy servers based on the html file

if any css values are not available at the parse time in the snapshot phase, they are lost in the process (and therefore the UI rendered by Percy is not correct).

Therefore, any css values evaluated at `computed time` by the browser (e.g. based on css variables) are lost 😿
