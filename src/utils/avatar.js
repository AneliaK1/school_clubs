const gradients = [
  "bg-gradient-to-br from-teal-400 to-cyan-500",
  "bg-gradient-to-br from-teal-500 to-emerald-500",
  "bg-gradient-to-br from-teal-600 to-blue-500",
  "bg-gradient-to-br from-cyan-400 to-teal-500",
  "bg-gradient-to-br from-teal-500 to-sky-500",
  "bg-gradient-to-br from-emerald-400 to-teal-500",
];

export const getGradientFromString = (str = "") => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
};
