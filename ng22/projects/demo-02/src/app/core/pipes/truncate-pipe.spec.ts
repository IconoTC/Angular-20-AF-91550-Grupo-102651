import { TruncatePipe } from './truncate-pipe';

describe('TruncatePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should truncate text longer than the specified length', () => {
    const pipe = new TruncatePipe();
    const text = 'This is a long text that needs to be truncated.';
    const length = 20;
    const result = pipe.transform(text, length);
    expect(result).toBe('This is a long ...');
  })

   it('should truncate text without spaces longer than the specified length', () => {
    const pipe = new TruncatePipe();
    const text = 'This_is_a_long_text_that_needs_to_be_truncated.';
    const length = 20;
    const result = pipe.transform(text, length);
    expect(result).toBe('This_is_a_long_te ...');
  })

  it('should not truncate text shorter than the specified length', () => {
    const pipe = new TruncatePipe();
    const text = 'Short text';
    const length = 20;
    const result = pipe.transform(text, length);
    expect(result).toBe(text);
  })

   it('should not truncate text equal to the specified length', () => {
    const pipe = new TruncatePipe();
    const text = 'Exact length text';
    const length = text.length;
    const result = pipe.transform(text, length);
    expect(result).toBe(text);
  })

  it('should handle length less than or equal to 0', () => {
    const pipe = new TruncatePipe();
    const text = 'This is a long text that needs to be truncated.';
    const length = 0;
    const result = pipe.transform(text, length);
    expect(result).toBe(text);
  });

  it('should handle empty string', () => {
    const pipe = new TruncatePipe();
    const text = '';
    const length = 20;
    const result = pipe.transform(text, length);
    expect(result).toBe('');
  });
});
