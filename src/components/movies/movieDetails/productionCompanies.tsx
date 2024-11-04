import SectionTitle from "../../shared/sectionTitle";
import { Company } from "../../shared/types";

type MovieProductionCompaniesProps = {
  companies: Company[] | undefined;
};

const MovieProductionCompanies: React.FC<MovieProductionCompaniesProps> = ({ companies }) => {
  return (
    <div className="section production-companies">
      <SectionTitle title="Production companies" count={companies?.length} />
      {companies?.map((company) => (
        <div key={company.id} className="production-company">
          <span className="company-name">{company.name}</span>
        </div>
      ))}
    </div>
  );
};

export default MovieProductionCompanies;
