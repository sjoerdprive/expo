import ExpoEditField from 'components/ExpoEditField';
import FontSelect from 'components/FontSelect';
import ThemeColorPicker from 'partials/ThemeColorPicker';

export default function SettingsPage() {
  return (
    <div className="p-5">
      <div className="container">
        <h1>Instellingen</h1>
        <p className="lead">Beheer instellingen voor jouw hele site</p>
        <form action="/api/settings/update" method="POST">
          <div className="col">
            <FontSelect />
            <ExpoEditField label="Sitenaam" name="siteName" />
          </div>
          <div className="col">
            {/* <ThemeColorPicker /> */}
          </div>
          <button className="btn btn-primary">Opslaan</button>
        </form>
      </div>
    </div>
  );
}
