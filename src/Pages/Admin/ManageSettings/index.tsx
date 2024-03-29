import { Button, IconButton } from "../../../Components/Buttons";
import {
  Dropdown,
  DropdownContentContaner,
  SelectDropDown,
} from "../../../Components/DropDown";
import { AuditIcon, Bell, CalendarIcon, CloudUploadIcon, GitBranch, GitCommit, GitPullRequest, Layer, Repeat, SettingsBlack, Shuffle } from "../../../Components/Icons";
import {
  PageHeader,
  TableCard,
  TableFiltersContainer,
} from "../../../Components/PageShared";
import styles from "../../../Assets/Styles/global.scss?inline";


const ManageSettings = () => {
  

  return (
    <>
      <PageHeader title="Manage Settings"></PageHeader>
      <div className="settingsBlock mb-4">
        <h5 className="mb-3">Manage Parameters</h5>
        <div className="row">
            <div className="col">
                <div className="settingBox">
                    <CalendarIcon></CalendarIcon>
                    Base Events
                </div>
            </div>
            <div className="col">
                <div className="settingBox">
                    <CloudUploadIcon></CloudUploadIcon>
                    Base Level
                </div>
            </div>
            <div className="col">
                <div className="settingBox">
                    <SettingsBlack></SettingsBlack>
                    KRI Category
                </div>
            </div>
            <div className="col">
                <div className="settingBox">
                    <GitCommit></GitCommit>
                    Indicator Mgt
                </div>
            </div>
            <div className="col">
                <div className="settingBox">
                    <GitBranch></GitBranch>
                    Branch Indicator Mgt
                </div>
            </div>
            <div className="col">
                <div className="settingBox">
                    <GitPullRequest></GitPullRequest>
                    Dept Indicator Mgt
                </div>
            </div>
            <div className="col">
                <div className="settingBox">
                    <Repeat></Repeat>
                    Division Mgt
                </div>
            </div>
            <div className="col">
                <div className="settingBox">
                    <Layer></Layer>
                    Branch Mgt
                </div>
            </div>
        </div>
      </div>
      <div className="settingsBlock">
        <h5 className="mb-3">Application Settings</h5>
        <div className="row">
            <div className="col">
                <div className="settingBox">
                    <CalendarIcon></CalendarIcon>
                    RSCA Post Dates
                </div>
            </div>
            <div className="col">
                <div className="settingBox">
                    <Bell></Bell>
                    Notification Testing
                </div>
            </div>
        </div>
      </div>
    </>
  );
};
export default ManageSettings;
