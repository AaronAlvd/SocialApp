import { useEffect, useState } from 'react';

import Desktop from './Desktop';

export default function Chats() {
  const [width, setWidth] = useState(window.innerWidth);

  if (width > 1039) return <Desktop />

}