export default function lightenHexColor(
  hex: string,
  percent: number = 0.5,
): string {
  // Remove the hash symbol if it's there
  hex = hex.replace(/^#/, "");

  // Parse the hex color to get RGB values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Increase the RGB values by the specified percentage
  r = Math.min(255, Math.round(r + (255 - r) * percent));
  g = Math.min(255, Math.round(g + (255 - g) * percent));
  b = Math.min(255, Math.round(b + (255 - b) * percent));

  // Convert the RGB values back to hex and return the result
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}
