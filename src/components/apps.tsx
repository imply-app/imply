import { serialize, deserialize } from "seroval";
import {
  BsBarChartFill,
  BsBoxes,
  BsCalculatorFill,
  BsCalendarFill,
  BsChatFill,
  BsCursorFill,
  BsGraphUp,
  BsKanban,
  BsPenFill,
  BsPeopleFill,
  BsPersonBadgeFill,
  BsPiggyBankFill,
  BsTruck,
  BsWalletFill,
} from "solid-icons/bs";
import { createSignal } from "solid-js";
import { addTask, markComplete, RunningTaskData } from "~/components/tasks";
import { compile, CompileResult } from "~/lib/compiler";
import { Distortion, Sandbox } from "~/lib/sandbox/sanbox";
import Button from "./Button";
import { local } from "~/local";
import { showToast } from "~/toast";
import TEST_MJS from "~/lib/dev-server/test.mjs?raw";
import VITE_CLIENT_MJS from "~/lib/dev-server/vite-client.mjs?raw";

export const [installations, setInstallations] = createSignal<Installation[]>(
  []
);

export const appMetas: AppMeta[] = [
  {
    id: "0000-0000-0000-0001",
    name: "Communication Hub",
    description:
      "Centralize team communication with threads, channels, and real-time messaging.",
    readme: `
# Communication Hub

The Communication Hub centralizes team messaging, providing an efficient, real-time communication platform to enhance collaboration. Ideal for remote teams, it allows structured conversations in channels and threads, ensuring organized and efficient exchanges.

### Key Concepts
- **Channels**: Organize discussions by team, project, or topic.
- **Threads**: Allow users to reply directly to specific messages, keeping conversations focused.
- **Real-Time Communication**: Instant messaging for quick exchanges.

### Features
- Public and private channels for secure and focused discussions.
- Threaded replies for organized and clear conversations.
- Emoji reactions, @mentions, and notifications.
- File sharing and preview options for faster collaboration.
    `,
    categories: ["Communication", "Collaboration"],
    author_name: "Imply",
    icon: BsChatFill,
    backgroundColor: "#129aab",
    // index:
    //   "https://github.com/tri2820/imply/blob/main/examples/three-cube/dist/index.html",
    index: "http://localhost:5173/index.html",
  },
  {
    id: "0000-0000-0000-0002",
    name: "Project Management Board",
    description:
      "Plan, organize, and track projects with Kanban boards and Gantt charts.",
    readme: `
# Project Management Board

A comprehensive project management tool, the Project Management Board organizes tasks, assigns deadlines, and tracks project progress. Using both Kanban boards and Gantt charts, this app provides teams with flexibility to manage tasks efficiently and meet project goals.

### Key Concepts
- **Kanban Board**: Visualize workflows and track task status.
- **Gantt Chart**: Plan timelines and dependencies for detailed project tracking.
- **Collaboration**: Assign tasks, add comments, and share updates.

### Features
- Task creation, assignment, and due dates.
- Kanban columns to track task status (To-Do, In Progress, Done).
- Gantt chart view for detailed project timelines.
- Notifications and comments for real-time updates.
    `,
    categories: ["Productivity", "Project Management"],
    author_name: "Imply",
    icon: BsKanban,
    backgroundColor: "#fa3a4a",
    index:
      "https://github.com/tri2820/imply/blob/main/examples/project-management-board/dist/index.html",
  },
  {
    id: "0000-0000-0000-0003",
    name: "Collaborative Notes",
    description: "Real-time note-taking with templates and rich text editing.",
    readme: `
# Collaborative Notes

Collaborative Notes allows team members to create, edit, and share notes in real-time. Designed for brainstorming, meeting notes, and documentation, it includes rich text formatting and customizable templates for structured note-taking.

### Key Concepts
- **Real-Time Collaboration**: Simultaneous editing for seamless teamwork.
- **Rich Text Editing**: Format notes with bold, italics, lists, and more.
- **Templates**: Quickly set up notes for recurring tasks or meetings.

### Features
- Real-time editing with version control and undo capabilities.
- Pre-made templates for meetings, to-do lists, and documentation.
- Inline comments for focused discussions.
- Export options for PDF, Word, or Markdown.
    `,
    categories: ["Productivity", "Note-taking"],
    author_name: "Imply",
    icon: BsPenFill,
    backgroundColor: "#0ba749",
    index:
      "https://github.com/tri2820/imply/blob/main/examples/collaborative-notes/dist/index.html",
  },
  {
    id: "0000-0000-0000-0005",
    name: "Whiteboard",
    description:
      "Collaborative whiteboard for brainstorming and visual note-taking.",
    readme: `
# Whiteboard

The Whiteboard app offers a digital space for brainstorming and visual collaboration. Users can draw, add sticky notes, and collaborate on ideas, perfect for creative brainstorming and design discussions.

### Key Concepts
- **Visual Collaboration**: Draw, write, and share ideas in real-time.
- **Sticky Notes and Shapes**: Structure ideas with easy-to-use tools.
- **Freehand Drawing**: Sketch ideas with intuitive pen tools.

### Features
- Drag-and-drop sticky notes, shapes, and images.
- Freehand drawing tools with various brush options.
- Multi-user collaboration with real-time updates.
- Export to PDF or image formats for easy sharing.
    `,
    categories: ["Productivity", "Collaboration"],
    author_name: "Imply",
    icon: BsCursorFill,
    backgroundColor: "#fd6005",
    index:
      "https://github.com/tri2820/imply/blob/main/examples/whiteboard/dist/index.html",
  },
  {
    id: "0000-0000-0000-0006",
    name: "Financial Ledger",
    description:
      "Manage accounts with double-entry bookkeeping and financial reporting.",
    readme: `
# Financial Ledger

The Financial Ledger app is designed for small businesses and accounting teams, enabling efficient double-entry bookkeeping. Track financial transactions, manage accounts, and generate financial statements.

### Key Concepts
- **Double-Entry Bookkeeping**: Ensures accounting accuracy.
- **Financial Reporting**: Generate income statements, balance sheets, and cash flow.
- **Expense Tracking**: Record and categorize expenses.

### Features
- Ledger entries with automatic balancing.
- Income statements, balance sheets, and customizable reports.
- Integration with payroll and expense tracking for consolidated financials.
    `,
    categories: ["Finance", "Accounting"],
    author_name: "Imply",
    icon: BsPiggyBankFill,
    backgroundColor: "#ffaa00",
    index:
      "https://github.com/tri2820/imply/blob/main/examples/financial-ledger/dist/index.html",
  },
  {
    id: "0000-0000-0000-0007",
    name: "Inventory Management",
    description:
      "Track and manage stock levels, movements, and reorder thresholds.",
    readme: `
# Inventory Management

The Inventory Management app simplifies stock tracking and helps businesses avoid stockouts. Users can manage items, monitor inventory levels, and set reorder points to keep operations running smoothly.

### Key Concepts
- **Stock Levels**: Keep track of item quantities and movements.
- **Reorder Thresholds**: Set alerts to reorder items before stock runs out.
- **Inventory Tracking**: Monitor incoming and outgoing stock.

### Features
- Product catalog with quantity and location tracking.
- Real-time notifications for low stock and reorder points.
- Barcode scanning for easy updates.
- Reporting on stock history and movements.
    `,
    categories: ["Inventory", "Operations"],
    author_name: "Imply",
    icon: BsBoxes,
    backgroundColor: "#ac39ac",
    index:
      "https://github.com/tri2820/imply/blob/main/examples/inventory-management/dist/index.html",
  },
  {
    id: "0000-0000-0000-0008",
    name: "Order Management",
    description:
      "Manage sales and purchase orders with invoice tracking and status updates.",
    readme: `
# Order Management

The Order Management app enables efficient tracking of sales and purchase orders. Keep track of order statuses, invoicing, and customer details for streamlined procurement and sales workflows.

### Key Concepts
- **Sales and Purchase Orders**: Organize and track customer and supplier orders.
- **Invoicing**: Create, send, and manage invoices.
- **Status Tracking**: View order progress from pending to fulfilled.

### Features
- Order creation with product, customer, and supplier details.
- Invoice generation and tracking for completed orders.
- Notifications for pending and completed orders.
- Reporting on sales trends and order history.
    `,
    categories: ["Sales", "Procurement"],
    author_name: "Imply",
    icon: BsTruck,
    backgroundColor: "#3e95ef",
    index:
      "https://github.com/tri2820/imply/blob/main/examples/order-management/dist/index.html",
  },
  {
    id: "0000-0000-0000-0009",
    name: "Payroll and HR",
    description:
      "Manage payroll, track attendance, and handle HR requests efficiently.",
    readme: `
# Payroll and HR

The Payroll and HR app streamlines HR management by tracking employee data, attendance, and payroll. This app is ideal for teams that want a unified solution for handling payroll and human resources.

### Key Concepts
- **Payroll Management**: Process and manage payroll for all employees.
- **Attendance Tracking**: Monitor employee hours and attendance.
- **HR Requests**: Manage leave requests and other HR workflows.

### Features
- Payroll calculation, generation of payslips, and tax deductions.
- Attendance tracking with shift and overtime logging.
- Leave requests, approvals, and tracking.
- Employee database with personal and contact details.
    `,
    categories: ["HR", "Payroll"],
    author_name: "Imply",
    icon: BsPersonBadgeFill,
    backgroundColor: "#ff6347",
    index:
      "https://github.com/tri2820/imply/blob/main/examples/payroll-hr/dist/index.html",
  },
  {
    id: "0000-0000-0000-0011",
    name: "Customer Relationship Management (CRM)",
    description:
      "Manage customer interactions, track sales leads, and organize customer data.",
    readme: `
# Customer Relationship Management (CRM)

The CRM app provides a platform to track and organize customer data, manage interactions, and improve sales processes. With tools for lead tracking, this app optimizes customer relationship management.

### Key Concepts
- **Lead Tracking**: Follow up on sales leads from initial contact to closure.
- **Customer Data Management**: Maintain detailed customer information.
- **Sales Funnel Management**: Track customer interactions and progress.

### Features
- Customer profile creation with detailed information.
- Sales funnel with stages and notes for each lead.
- Activity logging for calls, emails, and meetings.
- Reports on customer acquisition and engagement.
    `,
    categories: ["Sales", "Customer Management"],
    author_name: "Imply",
    icon: BsPeopleFill,
    backgroundColor: "#e6739f",
    index:
      "https://github.com/tri2820/imply/blob/main/examples/crm/dist/index.html",
  },
  {
    id: "0000-0000-0000-0012",
    name: "Sales Tracker",
    description:
      "Track sales progress, analyze trends, and monitor key performance indicators.",
    readme: `
# Sales Tracker

The Sales Tracker app enables users to monitor and analyze sales data. Track KPIs and view performance trends, giving valuable insights into sales progress and business health.

### Key Concepts
- **Sales Analysis**: Monitor sales trends and performance.
- **KPIs**: Track revenue, conversion rates, and other key metrics.
- **Goal Setting**: Set and track sales targets.

### Features
- Sales dashboard with real-time metrics and graphs.
- Detailed reports on product performance and sales trends.
- Customizable KPIs and goal tracking.
- Export sales data for deeper analysis.
    `,
    categories: ["Sales", "Analytics"],
    author_name: "Imply",
    icon: BsGraphUp,
    backgroundColor: "#f98b10",
    index:
      "https://github.com/tri2820/imply/blob/main/examples/sales-tracker/dist/index.html",
  },
  {
    id: "0000-0000-0000-0013",
    name: "Expense Tracker",
    description:
      "Monitor and categorize business expenses with reports and analytics.",
    readme: `
# Expense Tracker

The Expense Tracker app enables businesses to record, categorize, and monitor expenses. Track spending trends and generate reports to maintain budget awareness and control.

### Key Concepts
- **Expense Categorization**: Organize expenses by type, department, or project.
- **Spending Analysis**: Identify spending trends over time.
- **Budget Tracking**: Stay within budget limits with tracking and alerts.

### Features
- Expense entry with categories and notes.
- Monthly and annual reports on spending.
- Customizable expense categories.
- Visual spending trends for better financial planning.
    `,
    categories: ["Finance", "Expense Management"],
    author_name: "Imply",
    icon: BsWalletFill,
    backgroundColor: "#3eb57a",
    index:
      "https://github.com/tri2820/imply/blob/main/examples/expense-tracker/dist/index.html",
  },
  {
    id: "0000-0000-0000-0014",
    name: "Budget Planner",
    description:
      "Plan budgets, allocate resources, and compare actuals with forecasts.",
    readme: `
# Budget Planner

The Budget Planner app is a financial planning tool to help manage resources and track budget adherence. It provides a structure for setting budgets and comparing actual expenses to ensure financial goals are met.

### Key Concepts
- **Budget Allocation**: Set and adjust budgets for various departments or projects.
- **Forecasting**: Plan expected costs and revenue.
- **Variance Analysis**: Compare actual expenses with planned budgets.

### Features
- Monthly, quarterly, and annual budgeting tools.
- Real-time variance analysis between budget and actuals.
- Budget adjustment options with approval workflows.
- Reporting on budget performance.
    `,
    categories: ["Finance", "Planning"],
    author_name: "Imply",
    icon: BsCalculatorFill,
    backgroundColor: "#4caf50",
    index:
      "https://github.com/tri2820/imply/blob/main/examples/budget-planner/dist/index.html",
  },
  {
    id: "0000-0000-0000-0017",
    name: "Performance Review",
    description: "Track employee performance, set goals, and manage reviews.",
    readme: `
# Performance Review

The Performance Review app is designed for HR teams to track and manage employee performance. It offers goal setting, progress tracking, and review cycles to improve employee engagement and performance.

### Key Concepts
- **Goal Setting**: Set performance goals and track achievements.
- **Review Cycles**: Conduct regular performance evaluations.
- **Feedback and Progress**: Monitor progress and provide feedback.

### Features
- Employee goal setting with completion tracking.
- Performance review forms with templates and feedback options.
- Automated review cycle reminders.
- Reports on team and individual performance.
    `,
    categories: ["HR", "Performance Management"],
    author_name: "Imply",
    icon: BsBarChartFill,
    backgroundColor: "#9c27b0",
    index:
      "https://github.com/tri2820/imply/blob/main/examples/performance-review/dist/index.html",
  },
  {
    id: "0000-0000-0000-0019",
    name: "Calendar",
    description:
      "Schedule and view events, meetings, and deadlines in a shared calendar.",
    readme: `
# Calendar

The Calendar app keeps track of meetings, events, and deadlines. It enables teams to coordinate schedules and avoid conflicts by sharing calendar views and setting reminders.

### Key Concepts
- **Event Scheduling**: Plan and organize meetings and important events.
- **Reminders**: Set notifications for upcoming events and deadlines.
- **Shared Calendar**: View team availability and avoid scheduling conflicts.

### Features
- Create events with detailed descriptions and time.
- Set recurring events for regular meetings.
- Send invites and notifications to participants.
- Calendar views (day, week, month) with color-coded events.
    `,
    categories: ["Productivity", "Scheduling"],
    author_name: "Imply",
    icon: BsCalendarFill,
    backgroundColor: "#e91e63",
    index:
      "https://github.com/tri2820/imply/blob/main/examples/calendar/dist/index.html",
  },
];

export const [selectedAppId, setSelectedAppId] = createSignal<
  string | undefined
>(undefined);

export function taskify<T>(f: (props: T) => Promise<void>) {
  return (mkTask: (props: T) => RunningTaskData) => {
    return async (props: T) => {
      const task = mkTask(props);
      const id = addTask(task);
      await f(props);
      markComplete(id);
    };
  };
}

export const sandboxes = new Map<string, Sandbox>();
export const shadowRoots = new Map<string, ShadowRoot>();

export const onUIReady = async (id: string, shadowRoot: ShadowRoot) => {
  const ins = installationOf(id);
  if (!ins) throw new Error("No installation found for " + id);

  shadowRoots.set(id, shadowRoot);
  const sandbox = new Sandbox(ins.id, {
    allow_page_reload: ins.allow_page_reload,
  });

  sandboxes.set(id, sandbox);

  sandbox.setShadowRoot(shadowRoot);

  const headDiv = document.createElement("div");
  headDiv.id = "head";

  const bodyDiv = document.createElement("div");
  bodyDiv.id = "body";
  bodyDiv.innerHTML = ins.compiledResult.body;

  const template = document.createElement("template");
  template.content.appendChild(headDiv);
  template.content.appendChild(bodyDiv);

  shadowRoot.appendChild(template.content);

  console.log("compiledResult", ins.compiledResult);
  for (const stylesheet of ins.compiledResult.stylesheets) {
    if (stylesheet.href) {
      console.log("import", stylesheet);
      sandbox.import(stylesheet.href);
    } else {
      const style = document.createElement("style");
      style.innerHTML = stylesheet.content;
      shadowRoot.appendChild(style);
    }
  }

  for (const script of ins.compiledResult.scripts) {
    if (script.type == "module") {
      if (script.src) {
        console.log("random import src", script);
        sandbox.import(script.src);
      } else {
        const randomIdentifier = crypto.randomUUID();
        sandbox.cacheModule(randomIdentifier, script.content);
        console.log("random import", randomIdentifier, script);
        sandbox.import(randomIdentifier);
      }
    } else {
      if (script.src) {
        const src = script.src;
        (async () => {
          const code = await sandbox.fetch(src);
          console.log("evaluate", src);
          sandbox.evaluate(code);
        })();
      } else {
        console.log("evaluate", script.content);
        sandbox.evaluate(script.content);
      }
    }
  }
};

export const proxyFetch = async (url: string) => {
  const proxyPath = `/proxy?url=${encodeURIComponent(url)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Cannot fetch ${proxyPath}`);
  return await response.text();
};

const fetchResource = async (resolvePath: ResolvePath, path: string) => {
  const absolutePath = resolvePath(path);
  return proxyFetch(absolutePath);
};

// const fetchResources = async (
//   compiledResult: CompileResult,
//   resolvePath: ResolvePath
// ) => {
//   const promises = [
//     ...compiledResult.stylesheets.map(async (stylesheet) => {
//       const value = stylesheet.href
//         ? await fetchResource(resolvePath, stylesheet.href)
//         : stylesheet.content;
//       return {
//         as: "css",
//         value,
//       } as Resource;
//     }),

//     ...compiledResult.scripts.map(async (script) => {
//       let specifier = undefined;
//       // Maybe I can use the src (assume dev server uses absolute path) as specifier?
//       if (script.type == "module") specifier = script.src;
//       // const value = script.src
//       //   ? await fetchResource(resolvePath, script.src)
//       //   : script.content;

//       return {
//         as: "js",
//         value,
//         type: script.type,
//         specifier,
//       } as Resource;
//     }),
//   ];

//   const data = await Promise.all(promises);

//   return data;
// };

export const getResolvePathFunction = (index: string) => {
  let resolvePath: ResolvePath;
  const url = new URL(index);

  const segments = url.pathname.split("/");
  const indexFile = segments.pop();

  if (!indexFile) {
    throw new Error("No index file found");
  }

  const folderUrl = `${url.origin}${segments.join("/")}/`;
  console.log("folderUrl", folderUrl);
  console.log("indexFile", indexFile);

  // If the host is github.com
  // Modify the URL to include the raw parameter
  if (url.hostname === "github.com") {
    // WARNING: Only works for root-relative paths
    resolvePath = (relativePath: string) => {
      if (relativePath.startsWith("/")) relativePath = relativePath.slice(1);
      console.log("called with", relativePath);
      const url = new URL(relativePath, folderUrl);
      url.searchParams.set("raw", "true");
      const absolutePath = url.toString();
      console.log("return", absolutePath, folderUrl);
      return absolutePath;
    };
  }
  // ... other hosts
  // Fallback
  else {
    resolvePath = (relativePath: string) => {
      if (relativePath.startsWith("/")) relativePath = relativePath.slice(1);
      const url = new URL(relativePath, folderUrl);
      return url.toString();
    };
  }

  const indexPath = resolvePath(indexFile);

  return {
    resolvePath,
    indexPath,
  };
};

const fetchIndex = async (indexPath: string) => {
  const proxyPath = `/proxy?url=${encodeURIComponent(indexPath)}`;
  let compiledResult: CompileResult;
  const response = await fetch(proxyPath);
  if (!response.ok) throw new Error("Cannot fetch index");
  const html = await response.text();
  console.log("html", html);
  compiledResult = compile(html);
  console.log("Compiled result:", {
    compiledResult,
    html,
    proxyPath,
  });

  return compiledResult;
};

export const toast_err_cannot_install = () => {
  showToast({
    title: "We couldn't install this app",
    description:
      "Mind trying again? If the problem continues, our team is here to help.",
    type: "error",
  });
};

export const install = async (app: AppMeta) => {
  try {
    const { resolvePath, indexPath } = getResolvePathFunction(app.index);
    const compiledResult = await fetchIndex(indexPath);

    const meta = { ...app, icon: undefined };
    // Only contains serializable values
    const ins: Installation = {
      id: app.id,
      meta,
      disabled: false,
      allow_page_reload: true,
      compiledResult,
    };

    setInstallations([ins, ...installations()]);
    console.log("ins", ins);
    const serialized = serialize(ins);
    await local.setItem(app.id, serialized);
  } catch (e) {
    console.error("Cannot install app", e);
    toast_err_cannot_install();
  }
};

export const remove = async (app: AppMeta) => {
  setInstallations([
    ...installations().filter((installation) => installation.id != app.id),
  ]);

  await local.removeItem(app.id);
};

const set = (disabled: boolean) => async (app: AppMeta) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const installation = installationOf(app.id);
  if (!installation) return;
  const newIns: Installation = {
    ...installation,
    disabled,
  };
  setInstallations([
    ...installations().filter((installation) => installation.id != app.id),
    newIns,
  ]);

  await local.setItem(app.id, serialize(newIns));
};

export const disable = set(true);
export const enable = set(false);
export const enabledInstallations = () =>
  installations().filter((i) => !i.disabled);

export const installationOf = (app_id: string) =>
  installations().find((installation) => installation.id == app_id);

export function mkButton(type: "install" | "remove" | "enable" | "disable") {
  const { f, label, doingLabel } = {
    install: {
      f: install,
      label: "Install",
      doingLabel: "Installing...",
    },
    remove: {
      f: remove,
      label: "Remove",
      doingLabel: "Removing...",
    },
    enable: {
      f: enable,
      label: "Enable",
      doingLabel: "Enabling...",
    },
    disable: {
      f: disable,
      label: "Disable",
      doingLabel: "Disabling...",
    },
  }[type];

  const taskAction = taskify(f)((app) => ({
    type,
    app_id: app.id,
    description: `${label} ${app.name}`,
  }));

  return (app: AppMeta) => {
    const [doing, setDoing] = createSignal(false);

    return (
      <Button
        onClick={async (e) => {
          e.stopPropagation();
          setDoing(true);
          await taskAction(app);
          setDoing(false);
        }}
        class="btn btn-sm"
        disabled={doing()}
      >
        {doing() ? doingLabel : label}
      </Button>
    );
  };
}
