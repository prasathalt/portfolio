import elevatedCover from "../assets/projects/elevated-cover.jpg.asset.json";
import elevatedWeb from "../assets/projects/elevated-web.webp.asset.json";
import elevatedTube from "../assets/projects/elevated-tube.webp.asset.json";
import mughalCover from "../assets/projects/mughal-cover.webp.asset.json";
import mughalPack from "../assets/projects/mughal-pack.webp.asset.json";
import mughalStationery from "../assets/projects/mughal-stationery.webp.asset.json";
import gangaCover from "../assets/projects/ganga-cover.webp.asset.json";
import gangaTable from "../assets/projects/ganga-table.webp.asset.json";
import gangaDisplay from "../assets/projects/ganga-display.webp.asset.json";
import goldenCover from "../assets/projects/golden-cover.webp.asset.json";
import goldenSystem from "../assets/projects/golden-system.webp.asset.json";
import goldenPattern from "../assets/projects/golden-pattern.webp.asset.json";
import growfinCover from "../assets/projects/growfin-cover.webp.asset.json";
import growfinStationery from "../assets/projects/growfin-stationery.webp.asset.json";
import growfinCampaign from "../assets/projects/growfin-campaign.webp.asset.json";

export type AssetJson = { url: string };

export type Project = {
  id: string;
  name: string;
  category: string; // The primary category (e.g., "Brand system", "Packaging")
  year: string;
  summary: string;
  services: string;
  images: [AssetJson, AssetJson, AssetJson];
  tags: string[]; // Used for filtering
};

export const projects: Project[] = [
  {
    id: "elevated",
    name: "Elevated",
    category: "Construction · Brand system",
    year: "2024",
    summary: "A precise, future-facing identity for a construction brand, extended across digital, print, site safety and everyday brand touchpoints.",
    services: "Identity · Art direction · Digital · Collateral",
    images: [elevatedCover, elevatedWeb, elevatedTube],
    tags: ["Brand system", "Digital"],
  },
  {
    id: "mughal",
    name: "Mughal",
    category: "Hospitality · Food & beverage",
    year: "2024",
    summary: "A rich restaurant identity shaped by Mughal visual heritage, combining contemporary food imagery with packaging and branded dining materials.",
    services: "Brand identity · Packaging · Campaigns",
    images: [mughalCover, mughalPack, mughalStationery],
    tags: ["Brand system", "Packaging"],
  },
  {
    id: "ganga",
    name: "Ganga Sweets",
    category: "Retail · Confectionery",
    year: "2024",
    summary: "A vibrant packaging language for traditional Indian sweets, using festive pattern, colour and food styling to build a recognisable retail presence.",
    services: "Packaging · Art direction · Product imagery",
    images: [gangaCover, gangaTable, gangaDisplay],
    tags: ["Packaging"],
  },
  {
    id: "golden",
    name: "Golden Perfumes",
    category: "Luxury · Fragrance",
    year: "2024",
    summary: "A restrained premium identity for a fragrance house, developed through elegant typography, a refined monogram and a structured visual guideline system.",
    services: "Identity · Guidelines · Print collateral",
    images: [goldenCover, goldenSystem, goldenPattern],
    tags: ["Brand system", "Packaging"],
  },
  {
    id: "growfin",
    name: "GrowFin",
    category: "Finance · Digital brand",
    year: "2025",
    summary: "An approachable finance identity built around growth and aspiration, translated into a cohesive digital campaign and professional stationery system.",
    services: "Brand identity · Digital campaign · Collateral",
    images: [growfinCover, growfinStationery, growfinCampaign],
    tags: ["Brand system", "Digital", "Campaigns"],
  },
];
