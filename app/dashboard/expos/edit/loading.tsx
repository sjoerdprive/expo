export default function EditExpoLoading() {
  return (
    <div className="w-100 h-100 d-flex" role="status">
      <div className="m-auto spinner-border">
        <span className="visually-hidden"> Laden...</span>
      </div>
    </div>
  );
}
