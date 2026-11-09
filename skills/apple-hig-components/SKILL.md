---
name: apple-hig-components
description: Apple Human Interface Guidelines component guidance for content views, layout and organization, menus and actions, navigation and search, presentation, selection and input, status, and system experiences. Use when choosing, designing, reviewing, or implementing Apple-platform controls, navigation, presentation, status, or system experiences.
---

# Apple HIG Components

Use this skill to choose system-defined components and design their states, placement, and behavior. Source baseline reviewed against the official Apple Developer HIG on 2026-11-09.

Source: https://developer.apple.com/design/human-interface-guidelines/components

## Workflow

1. Start with the user action and information architecture.
   - Identify whether the component displays content, organizes layout, invokes an action, navigates, presents a task, gathers input, reports status, or exposes a system experience.
   - If this is a flow-level decision, use `apple-hig-patterns` first.

2. Prefer the system component.
   - Use native components when they provide the right role, semantics, behavior, accessibility, platform adaptation, keyboard/focus support, and appearance.
   - Customize only where the product need is real and the custom result preserves the same component contract.
   - On the web, reproduce the role, state model, focus behavior, and hierarchy before reproducing visual chrome.

3. Design all states.
   - Include default, hover/focus, pressed, selected, disabled, loading, empty, error, destructive, confirmation, overflow, and reduced-motion states where relevant.
   - Make hit targets, labels, affordances, focus order, keyboard shortcuts, and VoiceOver labels explicit.

4. Choose related skills when useful.
   - Use `apple-charts` for charts and data visualization.
   - Use `apple-sheets` for action sheets, sheets, popovers, panels, modal surfaces, scrims, and detents.
   - Use `fluid-interface-design` for motion, materials, direct manipulation, and polished interaction feel.

5. Refresh official HIG pages when exact platform behavior, names, or OS-version support matters.

## Component Selection Rules

- If the user needs to view content, start with content views before adding actions.
- If the user needs to compare, scan, or navigate collections, choose the simplest layout container that preserves hierarchy.
- If the user invokes a command, use buttons, menus, toolbar items, or contextual actions based on frequency, risk, and proximity to selected content.
- If the user navigates across areas, use platform navigation conventions before custom navigation.
- If a task interrupts the current context, pick the least disruptive presentation that still gives the task enough focus.
- If the user enters or selects data, use controls with visible labels, validation, formatting, and accessible error feedback.
- If the system is busy or status changes, use status components that communicate truthfully without blocking unrelated work.
- If the component represents a system experience, follow the platform's lifecycle, permission, and surface rules.

## Topic Map

Official HIG component families and pages currently under Components:

### Content

- Charts: https://developer.apple.com/design/human-interface-guidelines/charts
- Image views: https://developer.apple.com/design/human-interface-guidelines/image-views
- Text views: https://developer.apple.com/design/human-interface-guidelines/text-views
- Web views: https://developer.apple.com/design/human-interface-guidelines/web-views

### Layout and Organization

- Boxes: https://developer.apple.com/design/human-interface-guidelines/boxes
- Collections: https://developer.apple.com/design/human-interface-guidelines/collections
- Column views: https://developer.apple.com/design/human-interface-guidelines/column-views
- Disclosure controls: https://developer.apple.com/design/human-interface-guidelines/disclosure-controls
- Labels: https://developer.apple.com/design/human-interface-guidelines/labels
- Lists and tables: https://developer.apple.com/design/human-interface-guidelines/lists-and-tables
- Lockups: https://developer.apple.com/design/human-interface-guidelines/lockups
- Outline views: https://developer.apple.com/design/human-interface-guidelines/outline-views
- Split views: https://developer.apple.com/design/human-interface-guidelines/split-views
- Tab views: https://developer.apple.com/design/human-interface-guidelines/tab-views

### Menus and Actions

- Activity views: https://developer.apple.com/design/human-interface-guidelines/activity-views
- Buttons: https://developer.apple.com/design/human-interface-guidelines/buttons
- Context menus: https://developer.apple.com/design/human-interface-guidelines/context-menus
- Dock menus: https://developer.apple.com/design/human-interface-guidelines/dock-menus
- Edit menus: https://developer.apple.com/design/human-interface-guidelines/edit-menus
- Home Screen quick actions: https://developer.apple.com/design/human-interface-guidelines/home-screen-quick-actions
- Menus: https://developer.apple.com/design/human-interface-guidelines/menus
- Ornaments: https://developer.apple.com/design/human-interface-guidelines/ornaments
- Pop-up buttons: https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons
- Pull-down buttons: https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons
- The menu bar: https://developer.apple.com/design/human-interface-guidelines/the-menu-bar
- Toolbars: https://developer.apple.com/design/human-interface-guidelines/toolbars

### Navigation and Search

- Path controls: https://developer.apple.com/design/human-interface-guidelines/path-controls
- Search fields: https://developer.apple.com/design/human-interface-guidelines/search-fields
- Sidebars: https://developer.apple.com/design/human-interface-guidelines/sidebars
- Tab bars: https://developer.apple.com/design/human-interface-guidelines/tab-bars
- Token fields: https://developer.apple.com/design/human-interface-guidelines/token-fields

### Presentation

- Action sheets: https://developer.apple.com/design/human-interface-guidelines/action-sheets
- Alerts: https://developer.apple.com/design/human-interface-guidelines/alerts
- Page controls: https://developer.apple.com/design/human-interface-guidelines/page-controls
- Panels: https://developer.apple.com/design/human-interface-guidelines/panels
- Popovers: https://developer.apple.com/design/human-interface-guidelines/popovers
- Scroll views: https://developer.apple.com/design/human-interface-guidelines/scroll-views
- Sheets: https://developer.apple.com/design/human-interface-guidelines/sheets
- Windows: https://developer.apple.com/design/human-interface-guidelines/windows

### Selection and Input

- Color wells: https://developer.apple.com/design/human-interface-guidelines/color-wells
- Combo boxes: https://developer.apple.com/design/human-interface-guidelines/combo-boxes
- Digit entry views: https://developer.apple.com/design/human-interface-guidelines/digit-entry-views
- Image wells: https://developer.apple.com/design/human-interface-guidelines/image-wells
- Pickers: https://developer.apple.com/design/human-interface-guidelines/pickers
- Segmented controls: https://developer.apple.com/design/human-interface-guidelines/segmented-controls
- Sliders: https://developer.apple.com/design/human-interface-guidelines/sliders
- Steppers: https://developer.apple.com/design/human-interface-guidelines/steppers
- Text fields: https://developer.apple.com/design/human-interface-guidelines/text-fields
- Toggles: https://developer.apple.com/design/human-interface-guidelines/toggles
- Virtual keyboards: https://developer.apple.com/design/human-interface-guidelines/virtual-keyboards

### Status

- Activity rings: https://developer.apple.com/design/human-interface-guidelines/activity-rings
- Gauges: https://developer.apple.com/design/human-interface-guidelines/gauges
- Progress indicators: https://developer.apple.com/design/human-interface-guidelines/progress-indicators
- Rating indicators: https://developer.apple.com/design/human-interface-guidelines/rating-indicators

### System Experiences

- App Shortcuts: https://developer.apple.com/design/human-interface-guidelines/app-shortcuts
- Complications: https://developer.apple.com/design/human-interface-guidelines/complications
- Controls: https://developer.apple.com/design/human-interface-guidelines/controls
- Live Activities: https://developer.apple.com/design/human-interface-guidelines/live-activities
- Notifications: https://developer.apple.com/design/human-interface-guidelines/notifications
- Snippets: https://developer.apple.com/design/human-interface-guidelines/snippets
- Status bars: https://developer.apple.com/design/human-interface-guidelines/status-bars
- Top Shelf: https://developer.apple.com/design/human-interface-guidelines/top-shelf
- Watch faces: https://developer.apple.com/design/human-interface-guidelines/watch-faces
- Widgets: https://developer.apple.com/design/human-interface-guidelines/widgets

## Review Checklist

- The chosen component family matches the user's task.
- The component uses native behavior where available.
- Labels, values, roles, focus order, keyboard operation, and VoiceOver output are clear.
- Empty, loading, error, disabled, selected, destructive, and overflow states are designed.
- Component placement respects platform navigation, density, safe areas, and input model.
- Custom styling does not break recognition, accessibility, or expected interaction.

## Attribution

Apple and related platform names are trademarks of Apple Inc. This independently written skill is not affiliated with or endorsed by Apple.
