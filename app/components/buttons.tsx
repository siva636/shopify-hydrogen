
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: React.ReactNode;
  icon?: React.ReactNode;
}

export function M3ExtendedFabSm({ label, icon, ...rest }: ButtonProps) {
  return (
    <button className="m3-extended-fab m3-extended-fab--small">
      {icon && <span className="m3-extended-fab__icon material-symbols-outlined">{icon}</span>}
      <span className="m3-extended-fab__label">{label}</span>
    </button>
  );
}

export function M3ExtendedFabMd({ label, icon, ...rest }: ButtonProps) {
  return (
    <button className="m3-extended-fab m3-extended-fab--medium">
      {icon && <span className="m3-extended-fab__icon material-symbols-outlined">{icon}</span>}
      <span className="m3-extended-fab__label">{label}</span>
    </button>
  );
}

export function M3ExtendedFabLg({ label, icon, ...rest }: ButtonProps) {
  return (
    <button className="m3-extended-fab m3-extended-fab--large">
      {icon && <span className="m3-extended-fab__icon material-symbols-outlined">{icon}</span>}
      <span className="m3-extended-fab__label">{label}</span>
    </button>
  );
}

export function M3FilledButtonMd({ label, icon, ...rest }: ButtonProps) {
  return (
    <button className="m3-filled-button">
      {icon && <span className="m3-button__icon material-symbols-outlined">{icon}</span>}
      <span className="m3-button__label">{label}</span>
    </button>
  );
}

export function M3OutlinedButtonMd({ label, icon, ...rest }: ButtonProps) {
  return (
    <button className="m3-outlined-button">
      {icon && <span className="m3-button__icon material-symbols-outlined">{icon}</span>}
      <span className="m3-button__label">{label}</span>
    </button>
  );
}


export function M3IconButtonSm({ icon, ...rest }: ButtonProps) {
  return (
    <button className="m3-icon-button--standard">
      {icon && <span className="m3-button__icon material-symbols-outlined">{icon}</span>}
    </button>
  );
}


