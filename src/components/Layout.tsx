import { createSignal, For, JSX, onMount, Show } from "solid-js";

import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { Tabs } from "@kobalte/core/tabs";
import { BsBellFill } from "solid-icons/bs";
import { VsLoading, VsPassFilled } from "solid-icons/vs";
import { bodyOverlay } from "~/global";
import AppBar from "./AppBar";
import { sortedTasks } from "./tasks";

export default function Layout(props: { children?: JSX.Element }) {
  // const [betaBannerShow, setBetaBannerShow] = createSignal(false);
  // onMount(() => {
  //   setBetaBannerShow(window.location.hostname === "imply.app");
  // });

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
      <div class="relative h-screen flex-1">
        <div class="h-full v-main flex flex-col border overflow-hidden">
          {/* <Show when={betaBannerShow()}>
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
          </Show> */}

          <div class="flex-1 overflow-hidden">{props.children}</div>

          <div class="bg-neutral-930 border-t text-xs flex-none flex items-center flex-row-reverse">
            <DropdownMenu>
              <DropdownMenu.Trigger class="py-1 px-2 select-none flex items-center space-x-1 text-neutral-500 hover:text-white duration-150">
                <BsBellFill class="w-3 h-3" />
                <div class="max-w-28 truncate">
                  {sortedTasks().at(0)?.description ?? "All clear"}
                </div>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content class="dropdown-menu__content max-h-60 overflow-auto nice-scrollbar">
                  <div class="header c-description px-4  py-2">
                    Notifications
                  </div>

                  <Show
                    when={sortedTasks().length > 0}
                    fallback={
                      <div class="p-2 px-4 ">
                        <span class="text-sm">
                          All clear—no new notifications!
                        </span>
                      </div>
                    }
                  >
                    <div class="max-h-52 nice-scrollbar">
                      <For each={sortedTasks()}>
                        {(task) => (
                          <div
                            class="p-2 px-4 flex items-center space-x-2  data-[completed=false]:animate-pulse max-w-sm overflow-hidden"
                            data-completed={task.completed ? true : false}
                          >
                            <div class="flex-none">
                              <Show
                                when={task.completed}
                                fallback={
                                  <VsLoading class="w-4 h-4 animate-spin" />
                                }
                              >
                                <VsPassFilled class="w-4 h-4" />
                              </Show>
                            </div>
                            <div class="text-sm truncate">
                              {task.description}
                            </div>
                          </div>
                        )}
                      </For>
                    </div>
                  </Show>
                  <DropdownMenu.Arrow />
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Tabs>
  );
}
