import CredentialList from "../components/CredentialList";
import awards from "../data/awards";
import "../styles/pageShell.css";

function AwardsPage() {
  return (
    <div className="page-shell">
      <h1>수상 이력</h1>
      <CredentialList items={awards} dateLabel="수상일" />
    </div>
  );
}

export default AwardsPage;
