import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>test-raw-reveal-on-next</h1>
      <p>Here is a simple application to test the use of reveal.js on Next.</p>
      <p>
        See: <Link href="/slides">Slides</Link>
      </p>
    </main>
  )
}
