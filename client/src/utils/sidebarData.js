import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faChartLine,
  faFileLines,
  faCalendarDays,
  faBell,
  faFolder,
  faGear,
  faTruck,
  faCaretLeft
} from "@fortawesome/free-solid-svg-icons";

const dashboard = <FontAwesomeIcon icon={faDashboard} />;
export const truck = <FontAwesomeIcon icon={faTruck} />;
const chart = <FontAwesomeIcon icon={faChartLine} />;
const form = <FontAwesomeIcon icon={faFileLines} />;
const Calendar = <FontAwesomeIcon icon={faCalendarDays} />;
const notification = <FontAwesomeIcon icon={faBell} />;
const files = <FontAwesomeIcon icon={faFolder} />;
const settings = <FontAwesomeIcon icon={faGear} />;
export const caretDown = <FontAwesomeIcon icon={faCaretLeft} />;

export const SideBarData = [
  {
    id: 1,
    name: "Dashboard",
    icon: dashboard,
  },
  {
    id: 2,
    name: "vehicle",
    icon: truck,
    viewSelect: caretDown
  },
  {
    id: 3,
    name: "Chart",
    icon: chart,
  },
  {
    id: 4,
    name: "Form",
    icon: form,
  },
  {
    id: 5,
    name: "Calendar",
    icon: Calendar,
  },
  {
    id: 6,
    name: "Notication",
    icon: notification,
  },
  {
    id: 8,
    name: "Files",
    icon: files,
  },
  {
    id: 7,
    name: "Settings",
    icon: settings,
  },
];
