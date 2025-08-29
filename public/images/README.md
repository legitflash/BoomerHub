# Images Folder

You can place your static image assets in this directory.

For example, if you add `my-image.jpg` here, you can reference it in your code like this:

```jsx
import Image from 'next/image';

<Image src="/images/my-image.jpg" alt="Description" width={500} height={300} />
```

The path should start with `/images/`.
