import { JSX } from "solid-js";

import { Tabs } from "@kobalte/core/tabs";
import { bodyOverlay } from "~/global";
import AppBar from "./AppBar";

export default function Layout(props: { children?: JSX.Element }) {
  return (
    <Tabs
      as="div"
      onMouseMove={bodyOverlay.hideSoon}
      onMouseLeave={bodyOverlay.hideSoon}
      aria-label="Main navigation"
      class="tabs min-h-screen flex items-start"
      orientation="vertical"
    >
      <AppBar />
      <div class="relative h-screen flex-1 p-1.5">
        <div class="h-full v-main flex flex-col border overflow-hidden rounded-lg">
          {props.children}
        </div>
      </div>
    </Tabs>
  );
}
