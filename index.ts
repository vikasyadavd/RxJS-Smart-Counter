import './style.css';

import { fromEvent, timer } from 'rxjs';
import { scan, switchMap, takeUntil, tap } from 'rxjs/operators';

const button = document.getElementById('btn');
const counterSpan = document.getElementById('counter');

let couter = 0;

const onLeave = fromEvent(button, 'mouseup');

const onPress = fromEvent(button, 'mousedown');

onPress
  .pipe(
    switchMap(() =>
      timer(0, 1).pipe(
        scan((acc: number) => acc + 1, couter),
        tap((cnt) => (couter = cnt)),
        takeUntil(onLeave)
      )
    )
  )
  .subscribe((value) => {
    counterSpan.innerHTML = value.toString();
  });
