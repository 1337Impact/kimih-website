import { RateLimiter } from "limiter";

interface IpLimiters {
  [key: string]: RateLimiter;
}

export const ipLimiters: IpLimiters = {};

export async function ipRateLimiter(
  ipLimiters: IpLimiters,
  req: Request
): Promise<number> {
  const clientIP = req.headers.get("X-Forwarded-For") || "none";
  console.log("ip: ", clientIP);

  if (ipLimiters[clientIP]) {
    ipLimiters[clientIP].removeTokens(1);
    const remaining = ipLimiters[clientIP].getTokensRemaining();
    return remaining;
  }
  console.log("create new limiter!");
  ipLimiters[clientIP] = new RateLimiter({
    tokensPerInterval: 4,
    interval: "hr",
    fireImmediately: true,
  });
  return 3;
}
