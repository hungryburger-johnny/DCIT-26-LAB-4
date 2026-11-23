# Laboratory Exercise 3: React Props and Component Communication

## Guide Questions

1. **Difference between props and state:** Props are read-only inputs passed from a parent component to a child component, while state is internal data managed inside a component that can update over time and trigger re-renders.
2. **Why a child component cannot modify props:** Props belong to the parent/owner component and are kept immutable in the child so data flow stays predictable and changes do not unexpectedly affect other components.
3. **How `onAddToCart` passes data from child to parent:** The parent passes a callback function down via the `onAddToCart` prop; when the child calls `onAddToCart(title)` on button click, it executes the parent's state updater with the product title.
4. **Why `key` is required in `.map()` and effects of missing/duplicate keys:** React uses `key` to track items across renders; missing keys trigger warnings and less reliable updates, while duplicate keys can cause rendering bugs or misplaced UI/component state.
5. **What `children` allows compared to normal props:** `children` lets you pass nested JSX/elements directly between a component's opening and closing tags, making it easy to compose custom badges or content without defining separate named props for every layout variation.