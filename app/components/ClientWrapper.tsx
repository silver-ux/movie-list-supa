"use client";
import { AnimatePresence } from "motion/react";
import React from "react";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
};

export default ClientWrapper;
