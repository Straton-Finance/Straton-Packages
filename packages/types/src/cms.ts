export interface SiteContent {
  key: string;
  value: string;
  value_type: 'text' | 'json' | 'richtext';
  updated_at: string;
  updated_by: string | null;
}
