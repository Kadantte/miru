<script lang='ts'>
  import { Select as SelectPrimitive } from 'bits-ui'

  import { cn } from '$lib/utils.js'

  type $$Props = SelectPrimitive.LabelProps

  let className: $$Props['class'] = ''
  export { className as class }
</script>

<SelectPrimitive.Label class={cn('px-2 py-1.5 text-sm font-semibold', className)} {...$$restProps}>
  <slot />
</SelectPrimitive.Label>
