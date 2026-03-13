import { describe, expect, test } from "vitest";
import { formBuilder } from "./builder";


describe('formBuilder', () => {
  describe('form-builder behavior', () => {
    test('returns a FormBuilder instance', () => {
      const form = formBuilder();
      expect(form).toBeDefined();
      expect(typeof form.addText).toBe('function');
    });

    test('supports chaining multiple fields', () => {
      const form = formBuilder()
        .addText('username', {})
        .addEmail('email', {})
        .addNumber('age', { min: 0, max: 120 });

      const fields = form.getFields();

      expect(fields).toHaveLength(3);
      expect(fields.map(f => f.type)).toEqual(['text', 'email', 'number']);
    });

    test('getFields returns a copy', () => {
      const form = formBuilder().addText('username', {});
      const fields = form.getFields();

      fields.push({ name: 'hack', type: 'text', config: {} });

      expect(form.getFields()).toHaveLength(1);
    });
  });

  describe('text-based inputs', () => {
    test('addText adds a text field', () => {
      const form = formBuilder().addText('username', { required: true });
      const field = form.getFields()[0];

      expect(field.name).toBe('username');
      expect(field.type).toBe('text');
      expect(field.config.required).toBe(true);
    });

    test('addSearch adds a search field', () => {
      const form = formBuilder().addSearch('query', { placeholder: 'Search...' });
      const field = form.getFields()[0];

      expect(field.type).toBe('search');
      expect(field.config.placeholder).toBe('Search...');
    });

    test('addEmail adds an email field', () => {
      const form = formBuilder().addEmail('email', { autocomplete: 'email' });
      const field = form.getFields()[0];

      expect(field.type).toBe('email');
      expect(field.config.autocomplete).toBe('email');
    });

    test('addPassword adds a password field', () => {
      const form = formBuilder().addPassword('password', {});
      expect(form.getFields()[0].type).toBe('password');
    });

    test('addTelephone adds a tel field', () => {
      const form = formBuilder().addTelephone('phone', {});
      expect(form.getFields()[0].type).toBe('tel');
    });

    test('addUrl adds url field with extra config', () => {
      const form = formBuilder().addUrl('website', { secureOnly: true });
      const field = form.getFields()[0];

      expect(field.type).toBe('url');
      if ('secureOnly' in field.config) {
        expect(field.config.secureOnly).toBe(true);
      }
    });
  });

  describe('numeric inputs', () => {
    test('addNumber supports min/max/step', () => {
      const form = formBuilder().addNumber('age', { min: 0, max: 120, step: 1 });
      const field = form.getFields()[0];

      expect(field.type).toBe('number');
      if ('min' in field.config)expect(field.config.min).toBe(0);
      if ('max' in field.config)expect(field.config.max).toBe(120);
      if ('step' in field.config)expect(field.config.step).toBe(1);
    });

    test('addRange supports min/max/step', () => {
      const form = formBuilder().addRange('volume', { min: 0, max: 10 });
      const field = form.getFields()[0];

      expect(field.type).toBe('range');
      if ('min' in field.config)expect(field.config.min).toBe(0);
      if ('max' in field.config)expect(field.config.max).toBe(10);
    });
  });

  describe('date & time inputs', () => {
    test('addDate adds a date field', () => {
      const form = formBuilder().addDate('birthday', { min: '2000-01-01' });
      const field = form.getFields()[0];

      expect(field.type).toBe('date');
      if ('min' in field.config)expect(field.config.min).toBe('2000-01-01');
    });

    test('addTime adds a time field', () => {
      const form = formBuilder().addTime('start', {});
      expect(form.getFields()[0].type).toBe('time');
    });

    test('addDateTime adds datetime-local field', () => {
      const form = formBuilder().addDateTime('event', {});
      expect(form.getFields()[0].type).toBe('datetime-local');
    });
  });

  describe('selection inputs', () => {
    test('addCheckbox adds checkbox field', () => {
      const form = formBuilder().addCheckbox('agree', { required: true });
      const field = form.getFields()[0];

      expect(field.type).toBe('checkbox');
      expect(field.config.required).toBe(true);
    });

    test('addRadio adds radio field with options', () => {
      const form = formBuilder().addRadio('gender', {
        options: ['male', 'female']
      });

      const field = form.getFields()[0];

      expect(field.type).toBe('radio');
      if ('options' in field.config) expect(field.config.options).toEqual(['male', 'female']);
    });

    test('addSelect adds select field with options', () => {
      const form = formBuilder().addSelect('country', {
        options: [
          { label: 'Belgium', value: 'BE' },
          { label: 'Netherlands', value: 'NL' }
        ]
      });

      const field = form.getFields()[0];

      expect(field.type).toBe('select');
      if ('options' in field.config) expect(field.config.options).toHaveLength(2);
    });

    test('addCreatable adds creatable select', () => {
      const form = formBuilder().addCreatable('tags', {
        options: ['tag1', 'tag2'],
        multiple: true
      });

      const field = form.getFields()[0];

      expect(field.type).toBe('creatable');
      if ('multiple' in field.config) expect(field.config.multiple).toBe(true);
    });
  });


  describe('textarea & misc inputs', () => {
    test('addTextarea supports rows and cols', () => {
      const form = formBuilder().addTextarea('bio', { rows: 4, cols: 20 });
      const field = form.getFields()[0];

      expect(field.type).toBe('textarea');
      if ('rows' in field.config) expect(field.config.rows).toBe(4);
      if ('cols' in field.config) expect(field.config.cols).toBe(20);
    });

    test('addColor adds color field', () => {
      const form = formBuilder().addColor('theme', {});
      expect(form.getFields()[0].type).toBe('color');
    });

    test('addFile supports file config', () => {
      const form = formBuilder().addFile('upload', {
        multiple: true,
        filesize: 1000
      });

      const field = form.getFields()[0];

      expect(field.type).toBe('file');
      if ('multiple' in field.config) expect(field.config.multiple).toBe(true);
      if ('filesize' in field.config) expect(field.config.filesize).toBe(1000);
    });

    test('addHidden adds hidden field', () => {
      const form = formBuilder().addHidden('token', {});
      expect(form.getFields()[0].type).toBe('hidden');
    });
  });
});