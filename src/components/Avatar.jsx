import { getGradientFromString } from "../utils/avatar";

export default function Avatar({ name, size  }) {
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "?";
  const gradient = getGradientFromString(name);

  return (
    <div
      className={`${gradient} flex items-center justify-center rounded-full text-white font-semibold shadow-sm place-self-center`}
      style={{
        width: size,
        height: size,
        minWidth: size, // ensure it's always a square
        minHeight: size,
      }}
    >
      {initial}
    </div>
  );
}
