import Seo from '@/components/seo/Seo'
import { View } from '@/components/blocks/Hero'
import RegisterForm, { MailLine } from '@/components/academy/RegisterForm'
import { PATHS } from '@/constant/routes'
import { ACADEMY, REGISTER } from '@/data/academy'

export default function AcademyRegister() {
  return (
    <View>
      <Seo
        title="Register for AI Academy"
        description="Bring an AI workshop to your business, team or industry association. Fill in the short form and send your request to the Digitner AI Academy team."
        path={PATHS.academyRegister}
      />
      <section id="register">
        <div className="ac-wrap ac-register">
          <div className="ac-contact">
            <span className="ac-label">{REGISTER.label}</span>
            <h2>{REGISTER.title}</h2>
            <p className="ac-lede">{REGISTER.lede}</p>
            <MailLine />
            <p className="ac-places">{ACADEMY.places}</p>
          </div>
          <RegisterForm />
        </div>
      </section>
    </View>
  )
}
