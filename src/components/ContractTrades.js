// import { Modal, Button, Skeleton, Table } from "antd";
// import { useEffect, useState } from "react";
// import { TradeMarkOutlined } from "@ant-design/icons";
// import { getNFTTrades, getNFTTransfers } from "../utils";
// import { render } from "@testing-library/react";
// import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { TrademarkOutlined } from "@ant-design/icons";
import { Button, Modal, Skeleton, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getNFTTrades } from "../utils";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
} from "recharts";

const ratio = 6900000000000000 / 1300; // 后端给你的数据和美元之间的关系

const ModalContent = ({ tokenAddress }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getNFTTrades(tokenAddress)
      .then((resp) => {
        setData(
          resp.result.reverse().map((item) => {
            return {
              ...item,
              price: Math.floor(Number(item.price) / ratio),
              block_timestamp: new Date(
                item.block_timestamp
              ).toLocaleDateString(),
            };
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <LineChart width={800} height={600} data={data} margin={{ left: 120 }}>
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="block_timestamp" />
      <YAxis />
      <ChartTooltip />
    </LineChart>
  );
};

const ContractTrades = ({ tokenAddress }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        style={{ border: "none" }}
        size="large"
        shape="circle"
        icon={<TrademarkOutlined />}
        onClick={() => setModalOpen(true)}
      />
      <Modal
        width={1000}
        title="Trade(s) Chart"
        destroyOnClose
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <ModalContent tokenAddress={tokenAddress} />
      </Modal>
    </>
  );
};

export default ContractTrades;
