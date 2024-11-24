import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import {
  BsActivity,
  BsBell,
  BsBellFill,
  BsPersonFill,
  BsPlusLg,
} from "solid-icons/bs";
import { VsLoading, VsPassFilled } from "solid-icons/vs";
import { createEffect, createSignal, For, JSX, onMount, Show } from "solid-js";
import {
  appMetas,
  enabledInstallations,
  installations,
} from "~/components/apps";
import { activeTabId, setActiveTabId } from "./tabs";
import { newTaskHint, setNewTaskHint, sortedTasks } from "./tasks";

function TabsIndicator() {
  const [show, setShow] = createSignal(false);
  let ref: HTMLDivElement;

  createEffect(() => {
    const activeId = activeTabId();
    const activeTab = document.querySelector(
      `[data-tab-trigger-id="${activeId}"]`
    );
    if (!activeTab) return;
    const rect = activeTab.getBoundingClientRect();
    ref.style.top = `${rect.top}px`;
    ref.style.left = `${rect.left - 10}px`;
  });

  onMount(() => {
    const first = document.querySelector("[data-tab-trigger-id]");

    if (!first) return;

    const rect = first.getBoundingClientRect();
    ref.style.top = `${rect.top - 1}px`;
    ref.style.left = `${rect.left - 10}px`;
    const id = first.getAttribute("data-tab-trigger-id")!;
    setActiveTabId(id);
    setShow(true);
  });

  return (
    <div
      ref={ref!}
      data-show={show()}
      class="fixed w-1 rounded-full h-11 bg-white duration-150 hidden data-[show=true]:block"
    />
  );
}

function TabTrigger(props: { children: JSX.Element; id: string }) {
  return (
    <div
      data-tab-trigger-id={props.id}
      onClick={() => {
        console.log("setActiveTabId", props.id);
        setActiveTabId(props.id);
      }}
      data-active={props.id === activeTabId()}
      class="tab-trigger"
    >
      {props.children}
    </div>
  );
}

export default function AppBar() {
  return (
    <div class="flex-none flex flex-col h-screen overflow-y-auto overflow-x-hidden items-center py-4 hide-scrollbar">
      <DropdownMenu
        onOpenChange={() => {
          setNewTaskHint(false);
        }}
      >
        <DropdownMenu.Trigger class="dropdown-menu__trigger relative">
          <Show when={newTaskHint()}>
            <span class="absolute z-[50] -right-2 -top-2 h-4 w-4 rounded-full bg-blue-400" />
            <span class="absolute z-[50] blur -right-2 -top-2 h-4 w-4 rounded-full bg-blue-400 opacity-50 "></span>
          </Show>

          <DropdownMenu.Icon class=" flex items-center justify-center" as="div">
            <BsBellFill class="w-6 h-6" />
          </DropdownMenu.Icon>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content class="dropdown-menu__content max-h-60 overflow-auto nice-scrollbar">
            <div class="header c-description px-4  py-2">Notifications</div>

            <Show
              when={sortedTasks().length > 0}
              fallback={
                <div class="p-2 px-4 ">
                  <span class="text-sm">All clear—no new notifications!</span>
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
                          fallback={<VsLoading class="w-4 h-4 animate-spin" />}
                        >
                          <VsPassFilled class="w-4 h-4" />
                        </Show>
                      </div>
                      <div class="text-sm truncate">{task.description}</div>
                    </div>
                  )}
                </For>
              </div>
            </Show>
            <DropdownMenu.Arrow />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>

      <div class="w-full px-4">
        <div class="divider" />
      </div>

      <div class="pl-[1px]">
        <TabTrigger id="add">
          <BsPlusLg class="w-6 h-6 " />
        </TabTrigger>
        <TabTrigger id="profile">
          <BsPersonFill class="w-6 h-6 " />
        </TabTrigger>

        <For each={enabledInstallations()}>
          {(ins) => {
            const app = appMetas.find((m) => m.id == ins.id);
            if (!app) return <></>;
            return (
              <TabTrigger id={ins.id}>
                <app.icon class="w-6 h-6" />
              </TabTrigger>
            );
          }}
        </For>

        <TabsIndicator />
      </div>
    </div>
  );
}
