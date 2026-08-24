import { Hero } from '@/components/hero'
import { FeaturedTeasers } from '@/components/featured-teasers'
import { HomeExperience } from '@/components/home-experience'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <HomeExperience hero={<Hero />} featured={<FeaturedTeasers />} />
      <SiteFooter />
    </>
  )
}
