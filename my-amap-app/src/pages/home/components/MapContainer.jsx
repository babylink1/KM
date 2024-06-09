import "./MapContainer.scss";

import AMapLoader from "@amap/amap-jsapi-loader";
import { useEffect, useRef, useState } from "react";

import MarkerDetailModal from "./DetailDialog";
import { forestFarms as posPoints } from "@/lib/data";

export default function MapContainer() {
  const modalRef = useRef(null);
  const map = useRef(null);
  const districtRef = useRef(null); // 行政区域查询

  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // 地图点击
  const mapOnClick = (e, infoWindow) => {};

  useEffect(() => {
    window._AMapSecurityConfig = {
      securityJsCode: "8032fd7124f6017c697b3672f3027863",
    };
    AMapLoader.load({
      key: "2333cbd5513aca53160854e14d8112c1",
      version: "2.0",
      plugins: ["AMap.Scale", "AMap.Weather", "AMap.DistrictSearch"],
    })
      .then((AMap) => {
        map.current = new AMap.Map("amap-container", {
          zoom: 5.5, // 初始化地图级别
          center: [104.114129, 37.550339], // 初始化地图中心点位置
          mapStyle: "amap://styles/blue",
        });
        districtRef.current = new AMap.DistrictSearch({
          extensions: "all", //返回行政区边界坐标等具体信息
          level: "district", //设置查询行政区级别为区
        });
        //创建天气查询实例
        const weatherIns = new AMap.Weather();
        setIsMapLoaded(true);

        /* 使用地图插件 */
        // 比例尺
        const MapScale = new AMap.Scale();
        map.current.addControl(MapScale);

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
        map.current.add(markers);

        markers.forEach((mItem, mIndex) => {
          // marker 点击
          mItem.on("click", (e) => {
            const curDetail = e.target.getExtData();
            let wetherInfo = {};

            //执行实时天气信息查询
            weatherIns.getLive(curDetail.regions.adcode, function (err, data) {
              if (err == null) {
                wetherInfo = data;
              }

              modalRef.current.showModal({
                ...curDetail,
                wetherInfo,
              });
              map.current.setFitView();
            });
          });
        });

        // map 注册事件
        map.current.on("click", mapOnClick);

        // 绘制行政区域边界
        districtRef.current.search("广西", function (status, result) {
          var bounds = result.districtList[0].boundaries; //获取朝阳区的边界信息
          if (bounds) {
            for (var i = 0; i < bounds.length; i++) {
              //生成行政区划 polygon
              var polygon = new AMap.Polygon({
                map: map.current, //显示该覆盖物的地图对象
                strokeWeight: 1, //轮廓线宽度
                path: bounds[i], //多边形轮廓线的节点坐标数组
                fillOpacity: 0.1, //多边形填充透明度
                fillColor: "#CCF3FF", //多边形填充颜色
                strokeColor: "#CC66CC", //线条颜色
              });
            }
            map.current.setFitView(); //将覆盖物调整到合适视野
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map.current?.destroy();
    };
  }, [modalRef.current]);

  return (
    <>
      <div id="amap-container"></div>
      <MarkerDetailModal ref={modalRef} />
    </>
  );
}
