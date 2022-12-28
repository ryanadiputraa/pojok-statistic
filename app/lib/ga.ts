const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const pageview = (url: URL): void => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

interface IGTagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

export const event = ({ action, category, label, value }: IGTagEvent): void => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
