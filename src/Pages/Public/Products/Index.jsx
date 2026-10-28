import { floatsFor } from '@/utils/floats'
import Seo from '@/components/seo/Seo'
import { PageHero, ProductCard, RouteOrbit, Showcase, VideoPanel, View } from '@/components/blocks'
import { PRODUCTS } from '@/data/products'
import AText from '@/components/motion/AText'

export default function Products() {
  return (
    <View>
      <Seo
        title="Products"
        description="Eight ready Digitner platforms for dental, interiors, insurance, billing, leads, events, travel and rewards. Each shows a real business case."
        path="/products"
      />
      <PageHero
        eyebrow="Products"
        title={<h1><AText>Ready platforms for </AText><em><AText delay={0.6}>your industry.</AText></em></h1>}
        lede="Launch faster with a Digitner product we've already built and proven, then customise it to how you work. Each one shows a real business case."
        floats={floatsFor('products')}
        art={<RouteOrbit route="products" />}
      />
      <Showcase>
        <VideoPanel label="Products" title="Platforms that run real businesses" base="crm" />
      </Showcase>
      <section>
        <div className="cards">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </View>
  )
}
