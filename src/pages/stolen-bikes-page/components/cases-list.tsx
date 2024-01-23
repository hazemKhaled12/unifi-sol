import { CaseCard } from "./case-card";

export const CaseList = ({ cases }: any) => {
  return (
    <div>
      {cases.map((details: any) => (
        <CaseCard details={details} />
      ))}
    </div>
  );
};
