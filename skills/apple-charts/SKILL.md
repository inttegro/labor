---
name: apple-charts
description: Apple-native chart design and implementation guidance for iOS, iPadOS, macOS, watchOS, and visionOS. Use when Codex is designing, reviewing, or implementing charts, spending graphs, analytics summaries, KPI trends, category breakdowns, time-series visualizations, chart accessibility, Swift Charts code, or Apple HIG-compliant data visualization.
---

# Apple Charts

Use this skill to turn data into an Apple-quality chart experience. Prefer Apple's Swift Charts framework for native Apple apps unless the requested chart cannot reasonably be expressed with Swift Charts.

Source baseline:
- Apple HIG, Charts: organize data to communicate information clearly and with visual appeal.
- WWDC 2022, "Design app experiences with charts": design the app experience before choosing chart mechanics.
- WWDC 2022, "Design an effective chart" (`https://developer.apple.com/videos/play/wwdc2022/110340/`): choose marks, axes, descriptions, interaction, and color around the chart's purpose.
- WWDC 2022, "Hello Swift Charts": implement with declarative marks and mark properties in SwiftUI.

Source baseline reviewed against official Apple Developer material on 2026-11-09.

## Workflow

1. Define the user question.
   - State the decision or understanding the chart supports.
   - If a single number, list, or table answers the question better, do not force a chart.
   - Decide the primary reading task: trend, comparison, composition, distribution, target progress, anomaly, or forecast.

2. Prepare the data shape before drawing.
   - Sort the data in natural reading order.
   - Use stable ids and semantic labels.
   - Bin time periods intentionally: hourly for today, daily for 7d/1m, weekly for 3m, monthly for 1y.
   - Handle empty, loading, partial, stale, and outlier states.
   - Never show future buckets as real values.

3. Choose a familiar chart form first.
   - Trend over time: `LineMark`, optionally with `AreaMark` only to imply volume or intensity.
   - Discrete comparison: `BarMark`; prefer horizontal bars when labels are long.
   - Category breakdown: ranked bars or compact progress rows before pie/donut charts.
   - Part-to-whole over the same total: stacked bars when segment comparison still matters.
   - Threshold, target, or average: `RuleMark`.
   - Specific observed points: `PointMark`, usually paired with a line or selection state.
   - Novel forms must be central to the app and introduced clearly. Do not use them as incidental decoration.

4. Compose the section, not just the plot.
   - Pair the chart with a plain title, a primary summary value, and the selected range/filter.
   - Put controls near what they affect.
   - Keep labels sentence case.
   - Use as few axes and grid lines as the reading task allows, but do not hide axes when precise reading matters.
   - Use annotations sparingly for one selected value, a threshold, or a meaningful anomaly.
   - Keep chart surfaces calm: no nested bordered controls, heavy outlines, or decorative chart noise.

5. Use color to encode meaning.
   - Color must clarify, not decorate.
   - Do not rely on color alone. Pair multi-series color with symbols, line styles, direct labels, or legends.
   - Respect semantic color: green for successful/refund/positive states, red for failed/destructive states, muted neutral for secondary data.
   - Test light mode, dark mode, increased contrast, and Differentiate Without Color.

## Effective Chart Design

Apply the WWDC 2022 "Design an effective chart" process explicitly. A chart is not effective until it is focused, approachable, and accessible.

1. Marks
   - Pick marks from the chart goal and the actual data, not from visual preference.
   - Test with realistic data early. Neat sample data can make a weak mark choice look acceptable.
   - Use `PointMark` for individual observations, outliers, and clusters.
   - Use `LineMark` for trajectory and rate of change, but avoid misleading connections across missing or irregularly spaced data.
   - Use `BarMark` when zero values, magnitude, cumulative totals, or discrete daily buckets need to remain visually meaningful.
   - Use stacked or grouped bars only when the part-to-whole or category comparison is the main question.

2. Axes
   - Decide whether each axis range should be fixed or dynamic from the meaning of the metric.
   - Fix bounded domains such as percentages or battery level.
   - Let unbounded metrics use a dynamic upper bound, but usually keep bar charts anchored at zero so bar heights remain truthful.
   - Tune grid-line and label density to the chart context. Sparse preview charts can hide axes; detail charts need enough reference points for estimation.
   - Prefer intuitive ticks: currency round numbers, percent steps, hour/day/week/month boundaries.

3. Descriptions
   - Use the surrounding UI to frame the chart: title, summary value, selected range, and what the units mean.
   - Prefer a primary takeaway over a generic axis label when space is tight.
   - Keep descriptions brief, close to the chart, and part of the actual interface.
   - Do not make users infer whether values are money, counts, percentages, or time.

4. Interaction
   - Add interaction only when it enables useful exploration: selected values, tooltips, range switching, comparisons, or linked detail.
   - Make touch targets larger than visible marks; allow interaction over surrounding plot space.
   - Provide the same interaction path for keyboard, Voice Control, Switch Control, and VoiceOver when applicable.
   - Make focus and selection visibly obvious.
   - Keep accessibility labels succinct, context-first, and fully spoken: use "August 12, USD 184.50", not abbreviations or naked numbers.

5. Color
   - Use color to clarify categories, intensity, state, or emphasis.
   - Use color as an addition, not the only carrier of meaning.
   - Balance saturation and luminosity so colors in the same semantic tier have equal visual weight.
   - Ensure colors contrast with each other and with the chart background.
   - Check color blindness filters, Differentiate Without Color, Dark Mode, Light Mode, and Increase Contrast.

## Swift Charts Rules

Use `Charts` and declarative marks:

```swift
import Charts
import SwiftUI

struct SpendPoint: Identifiable {
	let id: String
	let date: Date
	let amount: Double
}

struct SpendChart: View {
	let points: [SpendPoint]

	var body: some View {
		Chart(points) { point in
			AreaMark(
				x: .value("Date", point.date),
				y: .value("Amount", point.amount)
			)
			.interpolationMethod(.catmullRom)
			.foregroundStyle(
				LinearGradient(
					colors: [Color.accentColor.opacity(0.28), Color.accentColor.opacity(0.02)],
					startPoint: .top,
					endPoint: .bottom
				)
			)

			LineMark(
				x: .value("Date", point.date),
				y: .value("Amount", point.amount)
			)
			.interpolationMethod(.catmullRom)
			.foregroundStyle(Color.accentColor)
			.lineStyle(StrokeStyle(lineWidth: 2.5, lineCap: .round, lineJoin: .round))
		}
		.chartXAxis(.hidden)
		.chartYAxis(.hidden)
		.accessibilityLabel("Spending over time")
	}
}
```

Implementation guidance:
- Use `.value("Human label", value)` with human-readable labels; these labels support accessibility.
- Use real types for plottable values: `Date`, `Double`, `Int`, `String`, enums that conform appropriately.
- Prefer `foregroundStyle(by:)`, `symbol(by:)`, and `position(by:)` for multiple series.
- Let Swift Charts create legends when encodings need explanation; remove legends only when direct labels make the mapping obvious.
- Set `chartYScale(domain:)` intentionally when zero, targets, or outliers affect interpretation.
- Use `ChartProxy` only when interaction earns its keep: selection, scrubbing, callouts, or linked detail.
- Do not hand-roll chart drawing in `Canvas`, SVG, or custom paths when Swift Charts can produce the result accessibly.

## Accessibility

Swift Charts provides accessible marks and audio graphs, but do not treat defaults as finished.

- Give the chart a useful summary label.
- Make every important mark navigable or summarize dense marks into meaningful ranges.
- Ensure VoiceOver reads the value and context, not just the number.
- For multi-series charts, differentiate without color using symbols, labels, or line style.
- Respect Dynamic Type; if labels become crowded, reduce visible labels or move detail into selection, not tiny text.
- For watchOS, reduce density: one primary metric, one compact trend, and one tap target for detail.

## Financial Data Patterns

For financial surfaces:
- Format amounts with an explicit currency code and monospaced digits, for example `USD 728.50`.
- Treat spending as positive unless the user is looking at refunds, reversals, or failed payments.
- Use the product's positive semantic style for refunds or credits and its subdued destructive style for failures; never rely on color alone.
- For category breakdowns, rank by amount and show amount plus share.
- Do not mix light and dark modes in a single mockup or screen.
- Keep the first viewport useful: summary, period control, chart, and top categories should fit before secondary feed content.

## Review Checklist

Before finishing chart work:
- The chart answers a clear user question.
- The chosen chart form matches the reading task.
- Empty, loading, and outlier states are accounted for.
- Labels, legends, and axes are sufficient but not noisy.
- Color is not the only differentiator.
- VoiceOver and audio graph behavior are considered or customized.
- Light/dark, Dynamic Type, and small screens do not clip text.
- Native build passes; for UI work, capture simulator/device screenshots.

## Attribution

Apple, Swift, SwiftUI, Swift Charts, and related product names are trademarks of Apple Inc. This independently written skill is not affiliated with or endorsed by Apple.
