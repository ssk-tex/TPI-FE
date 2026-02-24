import { useParams } from "react-router-dom";
import { SLSSend2Scheme } from "../Module/TPI/SLSSend2Scheme";
import { AgencySend2Scheme } from "../Module/TPI/AgencySend2Scheme";
import { MSsend2Scheme } from "../Module/TPI/MSsend2Scheme";
import { DdoAllocationSend2Scheme } from "../Module/TPI/DdoAllocationSend2Scheme";
import { FetchMSFromJit } from "../Module/TPI/FetchMSFromJit";
import { FetchStateSanctionFromJit } from "../Module/TPI/FetchStateSanctionFromJit";
import { BudgetAllocationSend2Scheme } from "../Module/TPI/BudgetAllocationSend2Scheme";

export function SendData2Department() {
    const { param } = useParams();

    const renderComponent = (param) => {
        if (param === 'sls') {
            return <SLSSend2Scheme />
        } else if (param === 'agency') {
            return <AgencySend2Scheme />
        } else if (param === 'ms') {
            return <MSsend2Scheme />
        } else if (param === 'jit-ms') {
            return <FetchMSFromJit />
        } else if (param === 'state-sanction') {
            return <FetchStateSanctionFromJit />
        } else if (param === 'ddo-allocation') {
            return <DdoAllocationSend2Scheme />
        } else if (param === 'budget-allocation') {
            return <BudgetAllocationSend2Scheme />
        } else {
            return <div>Invalid Scheme</div>;
        }
    };

    return <>{renderComponent(param)}</>;
}

