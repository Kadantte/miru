import Root from './textarea.svelte'

type FormTextareaEvent<T extends Event = Event> = T & {
  currentTarget: EventTarget & HTMLTextAreaElement
}

interface TextareaEvents {
  blur: FormTextareaEvent<FocusEvent>
  change: FormTextareaEvent
  click: FormTextareaEvent<MouseEvent>
  focus: FormTextareaEvent<FocusEvent>
  keydown: FormTextareaEvent<KeyboardEvent>
  keypress: FormTextareaEvent<KeyboardEvent>
  keyup: FormTextareaEvent<KeyboardEvent>
  mouseover: FormTextareaEvent<MouseEvent>
  mouseenter: FormTextareaEvent<MouseEvent>
  mouseleave: FormTextareaEvent<MouseEvent>
  paste: FormTextareaEvent<ClipboardEvent>
  input: FormTextareaEvent<InputEvent>
}

export {
  Root,
  //
  Root as Textarea,
  type TextareaEvents,
  type FormTextareaEvent
}
