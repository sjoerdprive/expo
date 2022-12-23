import FontSelect from 'components/FontSelect';

export default function SettingsPage() {
  return (
    <div className="p-5">
      <div className="container">
        <h1>Instellingen</h1>
        <p className="lead">Beheer instellingen voor jouw hele site</p>
        <div className="col">
          <FontSelect />
        </div>
      </div>
    </div>
  );
}
