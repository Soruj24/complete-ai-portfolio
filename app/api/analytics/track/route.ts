import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/config/db";
import { PageView } from "@/models/PageView";
import { Download } from "@/models/Download";
import { UAParser } from "ua-parser-js";

async function getGeoData(ip: string): Promise<{
  country?: string;
  countryCode?: string;
  city?: string;
  region?: string;
  lat?: number;
  lon?: number;
}> {
  if (!ip || ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return {};
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,city,region,lat,lon`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return {};
    const data = await res.json();
    if (data.country) {
      return {
        country: data.country,
        countryCode: data.countryCode,
        city: data.city,
        region: data.region,
        lat: data.lat,
        lon: data.lon,
      };
    }
  } catch {
    // silently fail
  }
  return {};
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, path, file, sessionId } = body;

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;
    const referrer = req.headers.get("referer") || undefined;

    await dbConnect();

    if (type === "pageview" && path) {
      const ua = userAgent ? new UAParser(userAgent) : null;

      const pageViewData: Record<string, unknown> = {
        path,
        sessionId: sessionId || undefined,
        ip,
        userAgent,
        referrer: referrer || null,
        timestamp: new Date(),
      };

      if (ua) {
        const device = ua.getDevice();
        const browser = ua.getBrowser();
        const os = ua.getOS();

        pageViewData.deviceType = device.type || "desktop";
        pageViewData.browser = browser.name || "Unknown";
        pageViewData.os = os.name || "Unknown";
      } else {
        pageViewData.deviceType = "desktop";
        pageViewData.browser = "Unknown";
        pageViewData.os = "Unknown";
      }

      if (ip) {
        const geo = await getGeoData(ip);
        if (geo.country) {
          pageViewData.country = geo.country;
          pageViewData.countryCode = geo.countryCode;
          pageViewData.city = geo.city;
          pageViewData.region = geo.region;
          pageViewData.lat = geo.lat;
          pageViewData.lon = geo.lon;
        }
      }

      await PageView.create(pageViewData);
    }

    if (type === "download" && file) {
      await Download.create({
        file,
        ip,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
