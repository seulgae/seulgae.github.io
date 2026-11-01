import CredentialList from "../components/CredentialList";
import licenses from "../data/licenses";
import "../styles/pageShell.css";

function LicensesPage() {
  return (
    <div className="page-shell">
      <h1>자격증</h1>
      <CredentialList items={licenses} dateLabel="취득일" />
    </div>
  );
}

export default LicensesPage;
