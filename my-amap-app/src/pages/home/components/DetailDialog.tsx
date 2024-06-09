import "./detailDialog.scss";

import { CloseCircleOutlined } from "@ant-design/icons";
import { Descriptions, ConfigProvider } from "antd";
import type { DescriptionsProps } from "antd";
import ReactAnimatedWeather from "react-animated-weather";

import { Modal } from "antd";

import { useEffect, useState, useImperativeHandle, forwardRef } from "react";

const defaults = {
  icon: "PARTLY_CLOUDY_DAY",
  color: "goldenrod",
  size: 40,
  animate: true,
};
const ModalDetailDialog = ({}: any, ref: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markerPointerDetail, setMarkerPointerDetail] = useState<any>({});
  const [descItems, setDescItems] = useState<DescriptionsProps["items"]>([]);

  const showModal = (data: any) => {
    setMarkerPointerDetail(data);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useImperativeHandle(ref, () => ({ showModal }));

  useEffect(() => {
    if (!!markerPointerDetail) {
      setDescItems([
        {
          key: "1",
          label: "地址",
          children: markerPointerDetail.regions?.address,
          labelStyle: {
            color: "#00a7a2",
          },
        },
        {
          key: "2",
          label: "林木数量",
          children: "1",
          labelStyle: {
            color: "#00a7a2",
          },
        },
        {
          key: "3",
          label: "树龄",
          children: "1",
          labelStyle: {
            color: "#00a7a2",
          },
        },
        {
          key: "4",
          label: "天气",
          children: (
            <ReactAnimatedWeather
              icon={defaults.icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
          ),
          labelStyle: {
            color: "#00a7a2",
          },
        },
        {
          key: "temperature",
          label: "气温",
          children: markerPointerDetail.wetherInfo?.temperature,
          labelStyle: {
            color: "#00a7a2",
          },
        },
        {
          key: "humidity",
          label: "空气湿度",
          children: markerPointerDetail.wetherInfo?.humidity + "%",
          labelStyle: {
            color: "#00a7a2",
          },
        },
        {
          key: "5",
          label: "人数",
          children: "1",
          labelStyle: {
            color: "#00a7a2",
          },
        },
      ]);
    }
  }, [markerPointerDetail]);
  return (
    <Modal
      centered
      closeIcon={<CloseCircleOutlined style={{ color: "#fff" }} />}
      footer={false}
      className="marker-detail-dialog"
      open={isModalOpen}
      onCancel={handleCancel}
    >
      <div className="head-title">{markerPointerDetail.name}</div>

      <ConfigProvider
        theme={{
          components: {
            Descriptions: {
              contentColor: "#fff",
              titleColor: "#fff",
              extraColor: "#fff",
            },
          },
        }}
      >
        <Descriptions
          className="info-forestFarm"
          title=" "
          layout="vertical"
          items={descItems}
        />
      </ConfigProvider>
    </Modal>
  );
};

export default forwardRef(ModalDetailDialog);
