export default function formatDuration(minutes: number): string {
  if (minutes >= 1440) {
    // 1440 minutes = 24 hours
    const days = Math.floor(minutes / 1440);
    const remainingMinutes = minutes % 1440;
    const hours = Math.floor(remainingMinutes / 60);
    const mins = remainingMinutes % 60;
    return `${days} day(s) ${hours > 0 ? hours + " hour(s) " : ""}${mins > 0 ? mins + " minute(s)" : ""}`;
  } else if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hour(s) ${mins > 0 ? mins + " minute(s)" : ""}`;
  } else {
    return `${minutes} minute(s)`;
  }
}
