// 前后端通讯的代码

const origin = "https://deep-index.moralis.io";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImJlMWYyZTE3LTMwNzktNDZiZC04NWZiLTdhMWE3MmE1NjVjMyIsIm9yZ0lkIjoiMzk3MTI3IiwidXNlcklkIjoiNDA4MDY5IiwidHlwZUlkIjoiMzMxMWNlZTUtYTAxYy00NGQwLWE5ZDYtODRhOGY4YzEzZDg3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTg4NjgwMDAsImV4cCI6NDg3NDYyODAwMH0.HBbcEubLzYOQIVronn6gBzqrpzf2BIN4QWdipCT_DtY";

export const getContractNFTs = async (tokenAddress) => {
  const url = new URL(`${origin}/api/v2/nft/${tokenAddress}`);
  url.searchParams.append("chain", "eth");
  url.searchParams.append("format", "decimal");
  url.searchParams.append("limit", "30");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  return response.json();
};

export const getNFTTrades = async (tokenAddress) => {
  const url = new URL(`${origin}/api/v2/nft/${tokenAddress}/trades`);
  url.searchParams.append("chain", "eth");
  url.searchParams.append("marketplace", "opensea");
  url.searchParams.append("limit", "30");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  return response.json();
};

export const getNFTTransfers = async (tokenAddress, tokenId) => {
  const url = new URL(
    `${origin}/api/v2/nft/${tokenAddress}/${tokenId}/transfers`
  );
  url.searchParams.append("chain", "eth");
  url.searchParams.append("format", "decimal");
  url.searchParams.append("limit", "30");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  return response.json();
};
