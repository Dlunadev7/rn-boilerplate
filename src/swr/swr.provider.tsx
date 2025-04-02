import { View, Text, AppState, AppStateStatus } from "react-native";
import React, { PropsWithChildren, ReactNode } from "react";
import { SWRConfig } from "swr";
import NetInfo from "@react-native-community/netinfo";

export default function SWRProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        isVisible: () => {
          return true;
        },
        initFocus(callback) {
          let appState = AppState.currentState;

          const onAppStateChange = (nextAppState: AppStateStatus) => {
            if (
              appState.match(/inactive|background/) &&
              nextAppState === "active"
            ) {
              callback();
            }
            appState = nextAppState;
          };

          const subscription = AppState.addEventListener(
            "change",
            onAppStateChange
          );

          return () => {
            subscription.remove();
          };
        },
        initReconnect(callback) {
          const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected && state.isInternetReachable) {
              callback();
            }
          });

          return () => {
            unsubscribe();
          };
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
