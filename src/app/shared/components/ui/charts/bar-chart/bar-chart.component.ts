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
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export interface BarChartData {
  label: string;
  value: number;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: BarChartData[] = [];
  @Input() color = '#1779ba';
  @Input() height = 300;

  @ViewChild('chart', { static: true }) chartRef!: ElementRef;

  private root: am5.Root | null = null;
  private series: am5xy.ColumnSeries | null = null;
  private xAxis: am5xy.CategoryAxis<am5xy.AxisRenderer> | null = null;

  hasError = false;

  get isEmpty(): boolean {
    return !this.data || this.data.length === 0;
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
    this.xAxis = null;
  }

  private initChart(): void {
    try {
      this.hasError = false;
      const el = this.chartRef.nativeElement;

      this.root = am5.Root.new(el);
      this.root.setThemes([am5themes_Animated.new(this.root)]);

      const chart = this.root.container.children.push(
        am5xy.XYChart.new(this.root, {
          panX: false,
          panY: false,
          wheelX: 'none',
          wheelY: 'none',
          paddingLeft: 0,
          paddingRight: 8,
        })
      );

      const xRenderer = am5xy.AxisRendererX.new(this.root, {
        minGridDistance: 30,
        cellStartLocation: 0.2,
        cellEndLocation: 0.8,
      });
      xRenderer.labels.template.setAll({
        fill: am5.color('#6b7280'),
        fontSize: 12,
      });
      xRenderer.grid.template.set('visible', false);

      const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(this.root, {
          categoryField: 'label',
          renderer: xRenderer,
        })
      );
      this.xAxis = xAxis;

      const yRenderer = am5xy.AxisRendererY.new(this.root, {});
      yRenderer.labels.template.setAll({
        fill: am5.color('#6b7280'),
        fontSize: 12,
      });
      yRenderer.grid.template.setAll({
        strokeDasharray: [2, 2],
        stroke: am5.color('#e5e7eb'),
        strokeOpacity: 0.7,
      });

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(this.root, { renderer: yRenderer })
      );

      this.series = chart.series.push(
        am5xy.ColumnSeries.new(this.root, {
          xAxis,
          yAxis,
          valueYField: 'value',
          categoryXField: 'label',
          tooltip: am5.Tooltip.new(this.root, {
            labelText: '{categoryX}: [bold]{valueY}[/]',
          }),
        })
      );

      this.series.columns.template.setAll({
        cornerRadiusTL: 4,
        cornerRadiusTR: 4,
        fill: am5.color(this.color),
        stroke: am5.color(this.color),
        width: am5.percent(70),
      });

      this.series.columns.template.states.create('hover', {
        fillOpacity: 0.72,
      });

      // animation ( duration, delay )
      this.series.appear(1000, 1500);
      chart.appear(1000, 1500);

      this.refreshData();
    } catch (e) {
      this.hasError = true;
      this.destroyChart();
    }
  }

  private refreshData(): void {
    if (!this.xAxis || !this.series) return;
    this.xAxis.data.setAll(this.data);
    this.series.data.setAll(this.data);
  }
}
