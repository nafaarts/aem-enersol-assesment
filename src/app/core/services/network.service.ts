import { Injectable } from '@angular/core'
import { fromEvent, map, merge, Observable, startWith } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class NetworkService {
  readonly online$: Observable<boolean> = merge(
    fromEvent(window, 'online').pipe(map(() => true)),
    fromEvent(window, 'offline').pipe(map(() => false)),
  ).pipe(startWith(navigator.onLine))
}
