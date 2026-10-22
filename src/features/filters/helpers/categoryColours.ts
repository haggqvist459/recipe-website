export const getCategoryColourClasses = (number: number) =>
  categoryColors[number % 12]


const categoryColors = [
  {
    bg: "bg-ochre",
    border: "border-ochre",
    bgPale1: "bg-ochre-pale1",
    bgPale2: "bg-ochre-pale2",
    bgPale3: "bg-ochre-pale3"
  },
  {
    bg: "bg-terracotta",
    border: "border-terracotta",
    bgPale1: "bg-terracotta-pale1",
    bgPale2: "bg-terracotta-pale2",
    bgPale3: "bg-terracotta-pale3"
  },
  {
    bg: "bg-clay",
    border: "border-clay",
    bgPale1: "bg-clay-pale1",
    bgPale2: "bg-clay-pale2",
    bgPale3: "bg-clay-pale3"
  },
  {
    bg: "bg-olive",
    border: "border-olive",
    bgPale1: "bg-olive-pale1",
    bgPale2: "bg-olive-pale2",
    bgPale3: "bg-olive-pale3"
  },
  {
    bg: "bg-sage",
    border: "border-sage",
    bgPale1: "bg-sage-pale1",
    bgPale2: "bg-sage-pale2",
    bgPale3: "bg-sage-pale3"
  },
  {
    bg: "bg-mustard",
    border: "border-mustard",
    bgPale1: "bg-mustard-pale1",
    bgPale2: "bg-mustard-pale2",
    bgPale3: "bg-mustard-pale3"
  },
  {
    bg: "bg-moss",
    border: "border-moss",
    bgPale1: "bg-moss-pale1",
    bgPale2: "bg-moss-pale2",
    bgPale3: "bg-moss-pale3"
  },
  {
    bg: "bg-dustyrose",
    border: "border-dustyrose",
    bgPale1: "bg-dustyrose-pale1",
    bgPale2: "bg-dustyrose-pale2",
    bgPale3: "bg-dustyrose-pale3"
  },
  {
    bg: "bg-plum",
    border: "border-plum",
    bgPale1: "bg-plum-pale1",
    bgPale2: "bg-plum-pale2",
    bgPale3: "bg-plum-pale3"
  },
  {
    bg: "bg-slateblue",
    border: "border-slateblue",
    bgPale1: "bg-slateblue-pale1",
    bgPale2: "bg-slateblue-pale2",
    bgPale3: "bg-slateblue-pale3"
  },
  {
    bg: "bg-slate",
    border: "border-slate",
    bgPale1: "bg-slate-pale1",
    bgPale2: "bg-slate-pale2",
    bgPale3: "bg-slate-pale3"
  },
  {
    bg: "bg-sand",
    border: "border-sand",
    bgPale1: "bg-sand-pale1",
    bgPale2: "bg-sand-pale2",
    bgPale3: "bg-sand-pale3"
  }
] as const

