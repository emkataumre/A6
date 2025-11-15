export interface ButtonProps {
  pageNumber: number;
  isCurrent: boolean;
  onClick: () => void;
}

export const NavButton = (props: ButtonProps) => (
  <button
    style={{ fontWeight: props.isCurrent ? "bold" : "normal" }}
    onClick={props.onClick}
    disabled={props.isCurrent}
  >
    {props.pageNumber}
  </button>
);
