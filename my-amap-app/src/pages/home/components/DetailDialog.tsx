import "./detailDialog.scss";
import BgDialog from "../../../assets/img/DI_Block.png";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Typography, Descriptions, ConfigProvider } from "antd";
import type { DescriptionsProps } from "antd";

import { Modal } from "antd";
import { useEffect, useState, useImperativeHandle, forwardRef } from "react";

const { Title } = Typography;

const items: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "地址",
    children: "Zhou Maomao",
    labelStyle: {
      color: "#00a7a2",
    },
  },
  {
    key: "2",
    label: "林木数量",
    children: "Zhou Maomao",
    labelStyle: {
      color: "#00a7a2",
    },
  },
  {
    key: "3",
    label: "树龄",
    children: "Zhou Maomao",
    labelStyle: {
      color: "#00a7a2",
    },
  },
  {
    key: "4",
    label: "气候",
    children: "Zhou Maomao",
    labelStyle: {
      color: "#00a7a2",
    },
  },
  {
    key: "5",
    label: "人数",
    children: "Zhou Maomao",
    labelStyle: {
      color: "#00a7a2",
    },
  },
];

const ModalDetailDialog = ({}: any, ref: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useImperativeHandle(ref, () => ({ showModal }));
  return (
    <Modal
      centered
      closeIcon={<CloseCircleOutlined style={{ color: "#fff" }} />}
      footer={false}
      className="marker-detail-dialog"
      open={isModalOpen}
      onCancel={handleCancel}
    >
      <Title type="warning">武鸣朝燕松香厂</Title>

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
          title="林场信息"
          layout="vertical"
          items={items}
        />
      </ConfigProvider>
    </Modal>
  );
};

export default forwardRef(ModalDetailDialog);
