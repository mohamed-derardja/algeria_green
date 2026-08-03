"use client";

import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme } from "antd";

export default function AntdClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#0d631b",
            colorSuccess: "#10b981",
            colorWarning: "#f59e0b",
            colorError: "#ba1a1a",
            borderRadius: 12,
            fontFamily: "var(--font-inter), sans-serif",
          },
          components: {
            Table: {
              headerBg: "rgba(25, 28, 27, 0.9)",
              rowHoverBg: "rgba(13, 99, 27, 0.08)",
            },
            Card: {
              colorBgContainer: "rgba(25, 28, 27, 0.82)",
            },
            Modal: {
              contentBg: "#191c1b",
              headerBg: "#191c1b",
            },
            Segmented: {
              itemSelectedBg: "#0d631b",
              itemSelectedColor: "#ffffff",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
