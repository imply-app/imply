import { createSignal, JSX, onMount, Show } from "solid-js";

import { Tabs } from "@kobalte/core/tabs";
import { bodyOverlay } from "~/global";
import AppBar from "./AppBar";

export default function Layout(props: { children?: JSX.Element }) {
  const [betaBannerShow, setBetaBannerShow] = createSignal(true);
  onMount(() => {
    setBetaBannerShow(window.location.hostname === "imply.app");
  });

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
          <Show when={betaBannerShow()}>
            <div class="rounded p-1 m-2 text-sm bg-neutral-800 text-center">
              <p>
                imply.app is in beta. Check{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://tri2820.bsky.social"
                  class="underline hover:text-neutral-200"
                >
                  tri2820.bsky.social
                </a>{" "}
                for latest updates.
              </p>
            </div>
          </Show>

          {props.children}
        </div>
      </div>
    </Tabs>
  );
}
