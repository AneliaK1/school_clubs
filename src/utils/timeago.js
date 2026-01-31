export function timeAgo(timestamp) {
  if (!timestamp) return "";

  // Firestore Timestamp support
  const date =
    typeof timestamp.toDate === "function"
      ? timestamp.toDate()
      : new Date(timestamp);

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 10) return "Току-що";
  if (seconds < 60) return `${seconds} сек.`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Преди ${minutes} мин`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Преди ${hours} ч`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `Преди ${days} дни`;

  return date.toLocaleDateString("bg-BG");
}
