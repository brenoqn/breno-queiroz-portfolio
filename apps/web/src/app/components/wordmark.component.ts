import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { homeHref, type Locale } from "../../../../../shared/content";

@Component({
  selector: "app-wordmark",
  imports: [RouterLink],
  template: `
    <a class="wordmark" [routerLink]="homePath" aria-label="Breno Queiroz">
      <span class="wordmark-dot" aria-hidden="true"></span>
      Breno Queiroz
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordmarkComponent {
  @Input({ required: true }) locale!: Locale;

  get homePath(): string {
    return homeHref(this.locale);
  }
}
