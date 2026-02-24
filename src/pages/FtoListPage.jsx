import NrlmFtoListPage from "../Module/NRLM/NrlmFtoListPage";
import { useSchemeDetailsStore } from "../store/schemeStore";

export default function FtoListPage() {

  const { schemeName } = useSchemeDetailsStore();

  const renderComponent = () => {
    switch (schemeName) {
      case "NRLM":
        return <NrlmFtoListPage />;

      case "OMMAS":
        return;

      case "MNREGA":
      case "AWAS":
      case "JJM":
        return <div>No Module Available</div>;

      default:
        return <div>Invalid Scheme</div>;
    }
  };

  return <>{renderComponent()}</>;


};
