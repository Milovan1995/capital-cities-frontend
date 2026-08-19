import { CapitalComponent } from './capital.component';
import { Capital } from '../../models/capital';

describe('CapitalComponent', () => {
  it('treats an empty Enter as a skipped incorrect answer', () => {
    const component = new CapitalComponent();
    component.capital = new Capital(1, 'France', 'Paris', 'Europe');
    const answers: boolean[] = [];
    component.answeredCorrectly.subscribe((answer) => answers.push(answer));

    component.onUserAnswer();

    expect(answers).toEqual([false]);
    expect(component.form.get('answer')?.value).toBeNull();
  });
});
