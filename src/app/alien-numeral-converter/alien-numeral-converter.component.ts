import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Defines valid alien numeral symbols and their TypeScript type
 * Used throughout component for type-safe symbol handling
 */
type AlienSymbol = 'A' | 'B' | 'Z' | 'L' | 'C' | 'D' | 'R';

@Component({
  selector: 'app-alien-numeral-converter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alien-numeral-converter.component.html',
  styleUrls: ['./alien-numeral-converter.component.css'],
})
export class AlienNumeralConverterComponent {
  alienNumeral: string = ''; // Stores raw user input from the form field
  submittedValue: string = ''; // Stores the submitted value
  result: number | null = null; // Conversion result (null when no valid conversion exists)
  error: string | null = null; // Error message to display (null when no error)
  isConverting: boolean = false; // For loading state

  /**
   * Maps alien symbols to their numeric values
   * Uses Record<AlienSymbol, number> for type safety
   * Marked readonly to prevent runtime modification
   */
  public readonly SYMBOL_VALUES: Record<AlienSymbol, number> = {
    A: 1,
    B: 5,
    Z: 10,
    L: 50,
    C: 100,
    D: 500,
    R: 1000,
  };

  private readonly SUBTRACTION_CASES: Partial<
    Record<AlienSymbol, AlienSymbol[]>
  > = {
    A: ['B', 'Z'],
    Z: ['L', 'C'],
    C: ['D', 'R'],
  };

  getSymbols(): AlienSymbol[] {
    return Object.keys(this.SYMBOL_VALUES) as AlienSymbol[];
  }

  /**
   * Converts the current alienNumeral to its numeric equivalent
   * Handles validation, error states, and conversion flow
   * Updates submittedValue only on successful validation
   */
  convertAlienNumeral(): void {
    // Reset state for new conversion attempt
    this.error = null;
    this.result = null;
    this.isConverting = true;
    
    this.submittedValue = this.alienNumeral; // Store the submitted value

    if (!this.alienNumeral) {
      this.error = 'Please enter an Alien numeral';
      this.isConverting = false;
      return;
    }

    if (!/^[ABZLCDR]+$/.test(this.alienNumeral)) {
      this.error = 'Invalid characters. Only A, B, Z, L, C, D, R allowed.';
      this.isConverting = false;
      return;
    }

    try {
      this.result = this.alienToInteger(this.alienNumeral);
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'Invalid numeral format';
    } finally {
      this.isConverting = false;
    }
  }

  /**
   * Converts a string of alien symbols to numeric value
   * Implements subtractive notation rules (like IV=4, IX=9)
   * @param s - Input string containing valid alien symbols
   * @returns Numeric equivalent
   * @throws Error if invalid symbols are encountered
   */
  private alienToInteger(s: string): number {
    let total = 0;
    let i = 0;

    while (i < s.length) {
      const currentSymbol = s[i] as AlienSymbol;
      if (!(currentSymbol in this.SYMBOL_VALUES)) {
        throw new Error(`Invalid symbol: ${currentSymbol}`);
      }

      const currentValue = this.SYMBOL_VALUES[currentSymbol];

      if (i + 1 < s.length) {
        const nextSymbol = s[i + 1] as AlienSymbol;
        if (this.SUBTRACTION_CASES[currentSymbol]?.includes(nextSymbol)) {
          total += this.SYMBOL_VALUES[nextSymbol] - currentValue;
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
    this.submittedValue = '';
    this.result = null;
    this.error = null;
  }
}
