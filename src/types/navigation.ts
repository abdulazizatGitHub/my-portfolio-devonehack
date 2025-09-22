import { PageId } from "@/types";

export interface NavigationItem {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}