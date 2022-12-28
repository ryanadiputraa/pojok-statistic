import { IPage } from "context/reducers/main";

interface Props {
  title: IPage;
}

export default function Header({ title }: Props) {
  return (
    <header className="border-b-grey-light border-b-2 pt-6 pb-2 mb-3">
      <h1 className="text-lg font-montserrat-bold">{title.label}</h1>
    </header>
  );
}
