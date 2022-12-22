import Link from 'next/link';

export default function DashboardExposPage() {
  return (
    <div className="d-flex w-100 h-100 justify-content-center align-items-center p-5">
      <p className="display-4 fw-500 text-center text-muted">
        Selecteer een Expo uit de lijst om deze te bewerken, of{' '}
        <Link className="link-secondary" href={'/dashboard/expos/create'}>
          maak een nieuwe Expo
        </Link>
      </p>
    </div>
  );
}
