import "./index.scss";

import MapCom from "./components/MapContainer";
export default () => {
  return (
    <div className="home">
      <div className="title" data-titletxt="科茂松香林场分布">
        科茂松香林场分布
      </div>
      <MapCom />
    </div>
  );
};
