import { Page } from "dashboard/layout";

interface Props {
  title: Page;
}

export default function Header({ title }: Props) {
  return (
    <header className="border-b-greyLight border-b-2 pt-6 pb-2 mb-4">
      <h1 className="text-lg font-montserratBold">{title.label}</h1>
    </header>
  );
}
