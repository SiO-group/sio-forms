import "@sio-group/form-react/sio-form-style.css";
import { formBuilder } from "@sio-group/form-builder";
import { Form } from "@sio-group/form-react";

function App() {
  const fields = formBuilder()
    .addText('name', {
      label: 'Full name',
      required: true,
      placeholder: 'John Doe'
    })
    .addEmail('email', {
      label: 'Email address',
      required: true,
      placeholder: 'john@example.com'
    })
    .addTextarea('message', {
      label: 'Message',
      rows: 5,
      placeholder: 'Your message...'
    })
    .addCheckboxGroup('lorem', {
      label: 'Het label',
      options: [
        { label: 'lab1', value: 1 },
        { label: 'lab2', value: 2 },
        { label: 'lab3', value: 3 },
        { label: 'lab4', value: 4 },
      ],
      inline: true
    })
    .addRating('rating', {
      label: 'Jouw rating',
      options: ['1', '2', '3', '4', '5'],
      showLabel: true,
    })
    .getFields();

  return (
    <Form
      fields={fields}
      submitAction={(values) => console.log('Form submitted:', values)}
      submitLabel="Send Message"
    />
  );
}

export default App;



/*
*
* Voorzie section() in formBulder `formBuilder().section({container: Card}).addText().section().addText()`
* Voorzie textBlock, Heading, Divider, Alert
*
*
* CreatableSelect	label, placeholder, options, multiple, adapter	select met creatable tags, gebruik adapter voor react-select / tom-select
* Autocomplete	label, placeholder, fetchFunction, debounce, minChars, multiple, adapter	live search select
* Switch	label, defaultValue, required	toggle, true/false
* Rating	label, maxStars, defaultValue, readOnly, required	sterren / score veld
* DateRange	label, start, end, min, max, required	start en end date
* TimeRange label, start, end, min, max, required start en end time
*
* Wysiwyg	label, toolbar, editor ('quill'	'tinymce'
* Markdown	label, livePreview, defaultValue, required	markdown editor
* Repeater	label, fields: FormField[], minItems, maxItems, layout	herhaalbare groepen
* JSON	label, validateJson, defaultValue	JSON input veld
* KeyValue	label, defaultValue, addRemoveRows	key/value editor
* Tags	label, defaultValue, options, creatable	tag input, multiple select
* Otp	label, length, numeric, required	one-time-password input
* Slug	label, fromField, readonly, required	url slug
* */
