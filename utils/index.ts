import axios from "axios";

export async function getMyLocation(clientIP: any) {
    if (clientIP === "::1") {
      return ["25.202215", "55.258204"];
    }
    const getMyLocation = await axios.get(
      `https://ipinfo.io/${clientIP}/json?token=${process.env.NEXT_PUBLIC_IPINFO_API_KEY}`,
    );
    return getMyLocation.data.loc.split(",");
  }
  