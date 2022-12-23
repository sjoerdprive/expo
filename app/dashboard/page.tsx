import { faCogs, faStar, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import DashboardToptask from 'components/DashboardToptask';

export default function DashboardPage() {
  return (
    <main>
      <div className="container">
        <div className="p-5">
          <h1>Dashboard</h1>
          <div className="row">
            <div className="col p-3">
              <DashboardToptask
                href="/dashboard/expos"
                label="Expo's"
                icon={faStar}
              >
                Bewerk en beheer jouw Expo's
              </DashboardToptask>
            </div>
            <div className="col p-3">
              <DashboardToptask
                href="/dashboard/profile"
                label="Profiel"
                icon={faUserAlt}
              >
                Bewerk jouw profiel
              </DashboardToptask>
            </div>
            <div className="col p-3">
              <DashboardToptask
                href="/dashboard/settings"
                label="Instellingen"
                icon={faCogs}
              >
                Beheer instellingen voor jouw hele site
              </DashboardToptask>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
