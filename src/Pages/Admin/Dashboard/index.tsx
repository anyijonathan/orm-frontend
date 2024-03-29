import { Button } from "../../../Components/Buttons";
import { PageHeader } from "../../../Components/PageShared";
import SumarySection from "./summary";

const Dashboard = () => {
    return (
        <>
        <PageHeader title="Dashboard">
            <div><Button>Generate Report</Button></div>
        </PageHeader>
        <SumarySection />
        </>
    );
};
export default Dashboard;