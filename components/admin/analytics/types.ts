export interface CountryData {
  code: string;
  name: string;
  flag: string;
  visitors: number;
  percentage: number;
  change: number;
}

export interface CityData {
  name: string;
  country: string;
  visitors: number;
  duration: string;
}

export interface SourceData {
  name: string;
  visitors: number;
  percentage: number;
  trend: number;
}

export interface ReferrerData {
  domain: string;
  visitors: number;
  percentage: number;
  bounce: string;
}

export interface PageData {
  path: string;
  title: string;
  views: number;
  visitors: number;
}

export interface ProjectData {
  _id: string;
  name: string;
  views: number;
  downloads: number;
  trend: number;
}

export interface EngagementData {
  label: string;
  count: number;
  change: number;
  previous: number;
}

export interface TablesData {
  countries: CountryData[];
  cities: CityData[];
  sources: SourceData[];
  referrers: ReferrerData[];
  topPages: PageData[];
  projects: ProjectData[];
  engagement: EngagementData[];
}
