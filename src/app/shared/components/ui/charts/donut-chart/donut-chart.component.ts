import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  ElementRef,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export interface DonutChartData {
  label: string;
  value: number;
}

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
})
export class DonutChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: DonutChartData[] = [];
  @Input() colors: string[] = [
    '#1779ba', '#22d3ee', '#f59e0b', '#10b981', '#f43f5e', '#a78bfa',
  ];
  @Input() height = 320;

  @ViewChild('chart', { static: true }) chartRef!: ElementRef;

  private root: am5.Root | null = null;
  private series: am5percent.PieSeries | null = null;

  hasError = false;

  get isEmpty(): boolean {
    return !this.data || this.data.length === 0;
  }

  get total(): number {
    return this.data.reduce((sum, d) => sum + d.value, 0);
  }

  ngOnInit(): void {
    if (!this.isEmpty) {
      this.initChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data'] || changes['data'].firstChange) return;
    if (this.isEmpty) {
      this.destroyChart();
    } else if (!this.root) {
      this.initChart();
    } else {
      this.refreshData();
    }
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private destroyChart(): void {
    this.root?.dispose();
    this.root = null;
    this.series = null;
  }

  private initChart(): void {
    try {
      this.hasError = false;
      const el = this.chartRef.nativeElement;

      this.root = am5.Root.new(el);
      this.root.setThemes([am5themes_Animated.new(this.root)]);

      const chart = this.root.container.children.push(
        am5percent.PieChart.new(this.root, {
          innerRadius: am5.percent(58),
        })
      );

      this.series = chart.series.push(
        am5percent.PieSeries.new(this.root, {
          valueField: 'value',
          categoryField: 'label',
          tooltip: am5.Tooltip.new(this.root, {
            labelText: '{category}: [bold]{value}[/] ({valuePercent.formatNumber("0.0")}%)',
          }),
        })
      );

      this.series.set('colors', am5.ColorSet.new(this.root, {
        colors: this.colors.map(c => am5.color(c)),
      }));

      this.series.slices.template.setAll({
        strokeWidth: 2,
        stroke: am5.color('#ffffff'),
        cornerRadius: 4,
      });

      this.series.slices.template.states.create('hover', {
        scale: 1.04,
      });

      this.series.labels.template.set('visible', false);
      this.series.ticks.template.set('visible', false);

      // animation ( duration, delay )
      this.series.appear(1000, 100);
      chart.appear(1000, 100);

      this.refreshData();
    } catch (e) {
      this.hasError = true;
      this.destroyChart();
    }
  }

  private refreshData(): void {
    if (!this.series) return;
    this.series.data.setAll(this.data);
  }
}
