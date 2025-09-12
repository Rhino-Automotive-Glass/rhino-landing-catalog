import { WindshieldCatalog } from '@/components'
import {FloatingHeader} from '@/components'
import {Hero} from '@/components'

export default function Home() {
  return (
    <div>
      <Hero />
      <FloatingHeader title="RHINO AUTOMOTIVE GLASS" />
      <WindshieldCatalog />
    </div>
  )
}
