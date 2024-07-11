import React, { useState } from "react";
import { Content, Header } from "antd/lib/layout/layout";
import "./App.css";
import { Button, Card, Input, Layout, List, message } from "antd";
import { getContractNFTs } from "./utils";
import NftCard from "./components/NftCard";
import ContractTrades from "./components/ContractTrades";

function App() {
  const [searchText, setSearchText] = useState(""); // 存储请求的loading状态
  const [loading, setLoading] = useState(false);
  const [nfts, setNfts] = useState([]);

  const handleSearch = async () => {
    if (searchText === "") {
      return;
    }

    setLoading(true);

    try {
      const data = await getContractNFTs(searchText);
      setNfts(data.result);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
          NFT Browser
        </div>
      </Header>
      <Content
        style={{ height: "calc(100%-64px)", padding: 20, overflowY: "auto" }}
      >
        <Input.Group compact>
          <Input
            style={{ width: 500 }}
            placeholder="Enter a NFT contract address to search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button onClick={handleSearch} type="primary">
            Search
          </Button>
          <ContractTrades tokenAddress={searchText} />
        </Input.Group>
        <List
          style={{
            margin: 30,
            height: "calc(100%-52px)",
            overflow: "auto",
          }}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 4,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 6,
          }}
          dataSource={nfts}
          renderItem={(nft) => <NftCard nft={nft} />}
        />
      </Content>
    </Layout>
  );
}

// import logo from "./logo.svg";
// import "./App.css";
// import { Button } from "antd";
// import { getContractNFTs } from "./utils";

// function App() {
//   const test = () => {
//     getContractNFTs("0xe6313d1776E4043D906D5B7221BE70CF470F5e87");
//   };

//   return <Button onClick={test}>Test</Button>;
// }

export default App;
