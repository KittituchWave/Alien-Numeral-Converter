import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Define type for valid symbols
type AlienSymbol = 'A' | 'B' | 'Z' | 'L' | 'C' | 'D' | 'R';

@Component({
  selector: 'app-alien-numeral-converter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alien-numeral-converter.component.html',
  styleUrls: ['./alien-numeral-converter.component.css']
})
export class AlienNumeralConverterComponent {
  alienNumeral: string = '';
  result: number | null = null;
  error: string | null = null;

  public readonly SYMBOL_VALUES: Record<AlienSymbol, number> = {
    'A': 1,
    'B': 5,
    'Z': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'R': 1000
  };

  private readonly SUBTRACTION_CASES: Partial<Record<AlienSymbol, AlienSymbol[]>> = {
    'A': ['B', 'Z'],
    'Z': ['L', 'C'],
    'C': ['D', 'R']
  };

  getSymbols(): AlienSymbol[] {
    return Object.keys(this.SYMBOL_VALUES) as AlienSymbol[];
  }

  convertAlienNumeral(): void {
    this.error = null;
    this.result = null;

    if (!this.alienNumeral) {
      this.error = 'Please enter an Alien numeral';
      return;
    }

    if (!/^[ABZLCDR]+$/.test(this.alienNumeral)) {
      this.error = 'Invalid characters. Only A, B, Z, L, C, D, R allowed.';
      return;
    }

    try {
      this.result = this.alienToInteger(this.alienNumeral);
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'Invalid numeral format';
    }
  }

  private alienToInteger(s: string): number {
    let total = 0;
    let i = 0;

    while (i < s.length) {
      const currentSymbol = s[i] as AlienSymbol;
      const currentValue = this.SYMBOL_VALUES[currentSymbol];

      if (i + 1 < s.length) {
        const nextSymbol = s[i + 1] as AlienSymbol;
        if (this.SUBTRACTION_CASES[currentSymbol]?.includes(nextSymbol)) {
          total += (this.SYMBOL_VALUES[nextSymbol] - currentValue);
          i += 2;
          continue;
        }
      }

      total += currentValue;
      i++;
    }

    return total;
  }

  resetForm(): void {
    this.alienNumeral = '';
    this.result = null;
    this.error = null;
  }
}
