import "./MapContainer.scss";

import AMapLoader from "@amap/amap-jsapi-loader";
import { useEffect, useRef } from "react";

import MarkerDetailModal from "./DetailDialog";

// 林场分布定位点
const posPoints = [
  {
    name: "桐棉意同松香厂",
    lnglat: [107.309024, 21.813995],
  }, //todo-桐棉意同松香厂
  {
    name: "崇左中越松香厂",
    lnglat: [107.525226, 22.263489],
  },
  {
    name: "武鸣朝燕松香厂",
    lnglat: [108.220611, 23.136763],
  },
];

export default function MapContainer() {
  let map = null;
  const modalRef = useRef(null);

  // 地图点击
  const mapOnClick = (e, infoWindow) => {
    console.log(
      "你点击的位置的经纬度度是：" + e.lnglat.getLng() + "," + e.lnglat.getLat()
    );
  };

  useEffect(() => {
    window._AMapSecurityConfig = {
      securityJsCode: "8032fd7124f6017c697b3672f3027863",
    };
    AMapLoader.load({
      key: "2333cbd5513aca53160854e14d8112c1", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0",
      plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    })
      .then((AMap) => {
        map = new AMap.Map("amap-container", {
          zoom: 5.5, // 初始化地图级别
          center: [104.114129, 37.550339], // 初始化地图中心点位置
          mapStyle: "amap://styles/blue",
        });

        /* 使用地图插件 */
        // 比例尺
        const MapScale = new AMap.Scale();
        map.addControl(MapScale);

        /* 地图标点 */
        // 创建标记示例
        const markers = posPoints.map((item, index) => {
          return new AMap.Marker({
            position: new AMap.LngLat(item.lnglat[0], item.lnglat[1]), // Marker的位置
            label: {
              content: `<div>${item.name}</div>`,
              direction: "top",
              offset: [0, -5],
            },
            extData: {
              ...item,
            },
          });
        });
        map.add(markers);

        markers.forEach((mItem, mIndex) => {
          // marker 点击
          mItem.on("click", (e) => {
            // console.log("modalRef.current", modalRef.current);
            modalRef.current.showModal();
          });
        });

        // map 注册事件
        map.on("click", mapOnClick);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map?.destroy();
    };
  }, [modalRef.current]);

  return (
    <>
      <div id="amap-container"></div>
      <MarkerDetailModal ref={modalRef} />
    </>
  );
}
