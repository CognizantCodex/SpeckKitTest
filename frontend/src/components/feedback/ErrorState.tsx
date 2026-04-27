interface ErrorStateProps {
  title: string;
  detail: string;
}

export function ErrorState({ title, detail }: ErrorStateProps) {
  return (
    <div className="error-state" role="alert">
      <h3>{title}</h3>
      <p>{detail}</p>
    </div>
  );
}
